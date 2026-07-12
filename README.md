# Portfolio Chat

An AI chat widget for a developer portfolio site that answers visitor questions in first person, as the portfolio owner's proxy — using a hardcoded system prompt with his background, skills, and project details rather than a live database.

🔗 **Live demo:** <!-- TODO: deploy and add URL, none found in repo -->
📸 **Screenshot:**
<!-- TODO: repo has two low-res screenshots ("Pasted image.png", "Pasted image (2).png") showing empty assistant replies — replace with a clean screenshot before embedding -->

## What it does
- Floating terminal-styled chat widget ("Talk to my agent") on the portfolio landing page
- Streams responses via the Vercel AI SDK (`streamText` + `useChat`)
- Answers as the portfolio owner's proxy: background, core skills, and a flagship project description, all defined in a static system prompt (no RAG/vector search — the prompt itself is the knowledge base)

## Tech stack
- Next.js 16, React 19, TypeScript
- Tailwind CSS v4
- Vercel AI SDK (`ai`, `@ai-sdk/react`, `@ai-sdk/openai-compatible`), pointed at a SiliconFlow-hosted `deepseek-ai/DeepSeek-V4-Flash` endpoint
<!-- TODO: verify — @ai-sdk/anthropic, @ai-sdk/google, @ai-sdk/openai are installed in package.json but not imported anywhere; drop them or wire them up -->

## Why I built this
A self-contained "ask my portfolio" widget so a site visitor can get quick, conversational answers about my background and work instead of reading a full page.

## Running locally
```bash
npm install
# requires a SiliconFlow API key
echo "SILICONFLOW_API_KEY=your_key_here" >> .env.local
echo "SILICONFLOW_BASE_URL=your_base_url_here" >> .env.local
npm run dev
```

<!-- TODO: verify — the system prompt text describes the model as "Claude Sonnet 4.6" and the stack as "Next.js 15," but the code actually runs DeepSeek-V4-Flash on Next.js 16.2.9. Fix the prompt copy so the chat widget doesn't tell visitors something false about its own model/stack. -->
