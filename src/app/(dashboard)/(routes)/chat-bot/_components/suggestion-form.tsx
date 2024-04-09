import { UseChatHelpers } from "ai/react";

export interface ChatMessageProps extends Pick<UseChatHelpers, "setInput"> {
  setInput: UseChatHelpers["setInput"];
  id?: string;
  ques: any;
  onSubmit: (value: string) => Promise<void>;
}

export default function SuggestedQuestionForm({
  ques,
  setInput,
  onSubmit,
}: ChatMessageProps) {
  return (
    <form
      className="h-full w-full"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!ques.question?.trim()) {
          return;
        }
        setInput("");
        await onSubmit(ques.question);
      }}
    >
      <button
        type="submit"
        className="w-full h-full cursor-pointer rounded-md border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 hover:bg-slate-50"
      >
        {ques.question}
      </button>
    </form>
  );
}
