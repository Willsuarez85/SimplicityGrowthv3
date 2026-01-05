import { NextRequest, NextResponse } from 'next/server';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface ChatRequest {
  message: string;
  fileContent: string;
  filePath: string;
  history: ChatMessage[];
}

export interface ChatResponse {
  message: ChatMessage;
  suggestedContent?: string;
  diff?: {
    before: string;
    after: string;
    changes: Array<{
      type: 'add' | 'remove' | 'unchanged';
      value: string;
    }>;
  };
}

// Simple diff function to show changes
function computeSimpleDiff(before: string, after: string) {
  const beforeLines = before.split('\n');
  const afterLines = after.split('\n');
  const changes: Array<{ type: 'add' | 'remove' | 'unchanged'; value: string }> = [];

  // Simple line-by-line diff
  const maxLen = Math.max(beforeLines.length, afterLines.length);
  let beforeIdx = 0;
  let afterIdx = 0;

  while (beforeIdx < beforeLines.length || afterIdx < afterLines.length) {
    const beforeLine = beforeLines[beforeIdx];
    const afterLine = afterLines[afterIdx];

    if (beforeLine === afterLine) {
      changes.push({ type: 'unchanged', value: beforeLine });
      beforeIdx++;
      afterIdx++;
    } else if (beforeLine === undefined) {
      changes.push({ type: 'add', value: afterLine });
      afterIdx++;
    } else if (afterLine === undefined) {
      changes.push({ type: 'remove', value: beforeLine });
      beforeIdx++;
    } else {
      // Lines differ - check if it's a modification or add/remove
      const beforeInAfter = afterLines.indexOf(beforeLine, afterIdx);
      const afterInBefore = beforeLines.indexOf(afterLine, beforeIdx);

      if (beforeInAfter !== -1 && (afterInBefore === -1 || beforeInAfter - afterIdx < afterInBefore - beforeIdx)) {
        // Line was added before current
        changes.push({ type: 'add', value: afterLine });
        afterIdx++;
      } else {
        // Line was removed
        changes.push({ type: 'remove', value: beforeLine });
        beforeIdx++;
      }
    }
  }

  return changes;
}

// Mock AI response generator - replace with actual AI integration
function generateMockResponse(message: string, fileContent: string): { response: string; suggestedContent?: string } {
  const lowerMessage = message.toLowerCase();

  // Detect common editing intents
  if (lowerMessage.includes('add section') || lowerMessage.includes('add a section')) {
    const sectionMatch = message.match(/add (?:a )?section (?:about |on |for )?["']?([^"']+)["']?/i);
    const sectionName = sectionMatch?.[1] || 'New Section';

    const newSection = `\n\n## ${sectionName}\n\n[Add content for ${sectionName} here]\n`;
    const suggestedContent = fileContent + newSection;

    return {
      response: `I've added a new section called "${sectionName}" at the end of the document. You can review the changes and click "Apply" to save them.`,
      suggestedContent,
    };
  }

  if (lowerMessage.includes('add bullet') || lowerMessage.includes('add point') || lowerMessage.includes('add item')) {
    const bulletMatch = message.match(/add (?:a )?(?:bullet|point|item)[:\s]+["']?(.+)["']?$/i);
    const bulletContent = bulletMatch?.[1] || 'New item';

    // Find the last list in the document and add to it
    const lines = fileContent.split('\n');
    let lastListIndex = -1;

    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* ')) {
        lastListIndex = i;
        break;
      }
    }

    if (lastListIndex !== -1) {
      lines.splice(lastListIndex + 1, 0, `- ${bulletContent}`);
      const suggestedContent = lines.join('\n');

      return {
        response: `I've added "${bulletContent}" as a new bullet point to the list. Review the changes below.`,
        suggestedContent,
      };
    }

    // No list found, add one at the end
    const suggestedContent = fileContent + `\n\n- ${bulletContent}\n`;
    return {
      response: `I've added a new bullet point with "${bulletContent}". Since there was no existing list, I created one at the end.`,
      suggestedContent,
    };
  }

  if (lowerMessage.includes('summarize') || lowerMessage.includes('summary')) {
    return {
      response: `This document contains ${fileContent.split('\n').length} lines and approximately ${fileContent.split(' ').length} words. Would you like me to:

- Add an executive summary at the top?
- Condense specific sections?
- Create bullet points from paragraphs?

Just let me know what kind of changes you'd like to make.`,
    };
  }

  if (lowerMessage.includes('fix') || lowerMessage.includes('improve') || lowerMessage.includes('enhance')) {
    return {
      response: `I can help improve this document. What specifically would you like me to focus on?

- **Grammar & spelling** - Fix any errors
- **Clarity** - Make the writing clearer
- **Structure** - Reorganize sections
- **Tone** - Adjust formality or style
- **Length** - Expand or condense content

Tell me which area to focus on, or describe the specific changes you want.`,
    };
  }

  // Default response
  return {
    response: `I understand you want to edit this file. Here are some things I can help with:

- **Add content**: "Add a section about [topic]"
- **Add bullets**: "Add bullet point: [content]"
- **Modify text**: "Change [old text] to [new text]"
- **Restructure**: "Move section X before section Y"
- **Summarize**: "Create a summary of this document"

What changes would you like to make?`,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { message, fileContent, filePath, history } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Generate response (mock for now - replace with actual AI)
    const { response, suggestedContent } = generateMockResponse(message, fileContent || '');

    // Build the response
    const assistantMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: 'assistant',
      content: response,
      timestamp: new Date().toISOString(),
    };

    const chatResponse: ChatResponse = {
      message: assistantMessage,
    };

    // If we have suggested content, include the diff
    if (suggestedContent && fileContent) {
      chatResponse.suggestedContent = suggestedContent;
      chatResponse.diff = {
        before: fileContent,
        after: suggestedContent,
        changes: computeSimpleDiff(fileContent, suggestedContent),
      };
    }

    return NextResponse.json(chatResponse);
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
