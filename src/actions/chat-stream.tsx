import { CoreMessage, nanoid } from "ai";
import {
  createAI,
  createStreamableUI,
  createStreamableValue,
  getAIState,
  getMutableAIState,
  StreamableValue,
} from "ai/rsc";
import { StreamResponse } from "@/utils/stream-response";
import { UserMessage } from "@/app/(routes)/chat-bot/[userid]/[chatid]/_components/user-message";
import { BotMessage } from "@/app/(routes)/chat-bot/[userid]/[chatid]/_components/bot-message";
import { storeChat } from "@/utils/store-chat";
import { SuggestionsBox } from "@/app/(routes)/chat-bot/[userid]/[chatid]/_components/suggestions";

async function submit(content: string, id: string) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();
  const uiStream = createStreamableUI();
  const isGenerating = createStreamableValue(true);

  const messages: CoreMessage[] = [...aiState.get()?.messages] as any[];

  if (content) {
    aiState.update({
      chatId: id ?? aiState.get().chatId,
      messages: [
        ...aiState.get().messages,
        {
          id: nanoid(),
          role: "user",
          content,
        },
      ],
    });
    messages.push({
      role: "user",
      content,
    });
  }

  const processEvents = async () => {
    const answer = await StreamResponse({ uiStream, messages });

    aiState.done({
      ...aiState.get(),
      messages: [
        ...aiState.get().messages,
        {
          id: nanoid(),
          role: "assistant",
          content: JSON.stringify(answer),
        },
      ],
    });
    uiStream.done();
    isGenerating.done(false);
  };

  processEvents();
  return {
    id: nanoid(),
    display: uiStream.value,
    isGenerating: isGenerating.value,
  };
}

export type AIMessage = {
  role: "function" | "user" | "assistant" | "system" | "tool" | "data";
  content: string;
  id: string;
};

export type AIState = {
  messages: AIMessage[];
  chatId: string;
};

export type UIState = {
  id: string;
  display: React.ReactNode;
  isGenerating?: StreamableValue<boolean>;
}[];

export interface Chat extends Record<string, any> {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
  messages: AIMessage[];
}

export const AI = createAI<AIState, UIState>({
  actions: {
    submit,
  },
  initialUIState: [],
  initialAIState: {
    chatId: nanoid(),
    messages: [],
  } as AIState,
  onGetUIState: async () => {
    "use server";

    const aiState = getAIState();
    if (aiState) {
      const uiState = getUIStateFromAIState(aiState);
      return uiState;
    } else {
      return;
    }
  },
  onSetAIState: async ({ state, done }: { state: AIState; done: boolean }) => {
    "use server";
    await storeChat({ messages: state.messages, chat_id: state.chatId });
  },
});

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages?.map((message) => {
    const { id, role, content } = message;
    switch (role) {
      case "user":
        return {
          id,
          display: <UserMessage message={content} />,
        };
      case "assistant":
        const answer = createStreamableValue();
        answer.done(JSON.parse(content));
        return {
          id,
          display: <BotMessage message={answer.value} />,
          suggestions: <SuggestionsBox message={answer.value} />,
        };
      default:
        return {
          id,
          display: <div />,
        };
    }
  });
};
