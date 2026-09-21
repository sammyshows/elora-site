'use client';

/**
 * Hardcoded seed prompt pools — transcribed 1:1 from
 * elora-api/src/common/prompts/guided-prompts.ts so the web experience works
 * with ZERO LLM calls for the opening prompt (only follow-ups hit the API).
 *
 * Keep this file in sync if the API pools ever change.
 */

export const DAILY_GENERIC_PROMPTS: readonly string[] = [
  'What was a tiny moment today that annoyed you more than it probably should have?',
  'What task or conversation are you quietly putting off right now, and what story are you telling yourself about it?',
  'What is taking up the most background processing power in your head today?',
  'Did you catch yourself playing mental chess or predicting how someone else would react today?',
  'What was one thing today that went slightly off script, and how did your brain respond?',
  'What gave you a little bit of energy today, even just for five minutes?',
  'If today had a physical weather report inside your body, what would it look like?',
  'What is one thing you can take off your mental plate for the rest of the day?',
  'What was the best food, sound, or physical sensation you experienced today?',
  'Describe your day so far using only three honest adjectives.',
  'What was a moment today where you felt like yourself?',
  'What is something you wish you had said out loud today, but held back?',
  "Where did you spend emotional energy today that you probably won't care about a week from now?",
  'What did you do today simply because you wanted to, not because you had to?',
  'If a close friend had the exact day you had today, what would you say to them tonight?',
  "What is something you're dealing with right now that you just wish had an easy answer?",
  'What conversation from the last 48 hours is still rattling around in your head?',
  'What is a small expectation you had for today that quietly fell apart?',
  'Where did you feel a little resistance or hesitation today, and what made you pause?',
  'What is one thing you have been telling yourself "I really need to get to that" about?',
  "Look around the space you're sitting in right now. What is one small thing you notice that you usually ignore?",
  'On a scale from "running on fumes" to "full tank," where are you sitting right now, and why?',
  'What has been the most physically comfortable or uncomfortable part of your day so far?',
  'What is a sound, view, or sensation that crossed your path today that was surprisingly nice?',
  'If you could wipe your schedule clean for the next three hours, what would you immediately do?',
  'What is a choice you made today that you feel quietly solid about?',
  'What did you have to tolerate, put up with, or be patient with today?',
  'What is one thing you can declare "good enough for today" and stop tweaking or stressing over?',
  'What is something that felt urgent a few hours ago, but already feels a little less important now?',
  'If you had to pick one moment today where you felt most like yourself, what was happening?',
  'What is a belief or opinion you found yourself holding firmly this week?',
  'Who was the most interesting or memorable person you crossed paths with today, even briefly?',
  'What is a small habit or routine you relied on today to keep things moving?',
  'What is something you learned, read, or heard recently that made you stop and think for a second?',
  'What is the most honest sentence you can write right now about how you are feeling?',
  'What was the most mundane part of your day that you actually kind of enjoyed?',
  'What is a sound or smell you ran into today that immediately made you feel something?',
  'What is something you noticed today that felt out of place or mildly absurd?',
  'If you had to capture today in a single snapshot or photograph, what would be in the frame?',
  'What was the exact moment today when you realized you were tired?',
  'What is something you pretended to care about today just to keep the peace?',
  "What is an opinion you hold strongly right now that you wouldn't necessarily share at a dinner party?",
  'What is something popular or trending that you just cannot bring yourself to care about?',
  'What was a conversation today where you said what was expected instead of what you actually thought?',
  'What is a small rule or convention you secretly love ignoring?',
  'What drained five percent of your battery today without you realizing it at the time?',
  'What was the easiest decision you made today, and what made it so effortless?',
  'What is something you did today purely out of momentum, rather than conscious intent?',
  'What part of your day felt the most rushed, and was it actually an emergency?',
  'If your mind right now was an open browser with twenty tabs, which tab is playing audio in the background?',
  'What was a moment today where you handled something just a little bit better than you would have a year ago?',
  'What is something you said "no" to today, even if it was just in your own head?',
  'What was a small moment of competence today where you thought, "I actually know how to do this"?',
  'What is a problem you solved today that nobody else will ever notice or thank you for?',
  'What is something you managed to protect today, whether it was your time, focus, or peace?',
  'What is a skill, habit, or trait you picked up from someone else that has now just become part of who you are?',
  'What is a recurring theme or lesson that life seems determined to keep teaching you lately?',
  "What is something you are currently anticipating that you're not sure whether to be excited or nervous about?",
  'If you looked at your day strictly from the outside as an observer, what would look like your top priority right now?',
  "What is a question you've been chewing on lately that you don't necessarily want answered yet?",
];

export const RETROSPECTIVE_PROMPTS: readonly string[] = [
  'Think of the bedroom you slept in around age ten. What is the first detail that comes back to you?',
  'What is a specific meal from your childhood that instantly takes you back, and who was usually at the table?',
  'What was your favorite hiding spot or escape place when you were growing up?',
  'What object did you own years ago that felt impossible to get rid of, even if it was objectively junk?',
  'Think of a neighborhood you used to know by heart. What does it smell or sound like?',
  'What is an old version of yourself that makes you cringe a little, but you can still appreciate now?',
  'What was a piece of advice you followed for years before realizing it did not work for you?',
  'What was an interest or obsession you had years ago that you completely abandoned?',
  'Who was the first person outside your family who made you feel truly understood?',
  'Think back to a job or project that drained you completely. What did it teach you about what you refuse to tolerate?',
  'What was a quiet choice you made years ago that ended up changing the trajectory of your life?',
  'What is a door that closed on you in the past that you are now quietly grateful did not open?',
  'What was a risk you took where you had no idea how it would turn out, but you did it anyway?',
  'Who is someone from your past you lost touch with, but you still think of fondly?',
  'If you could send a two-sentence text to yourself five years ago, what would it say?',
  'What was your very first favorite album or artist, and how do you feel listening to that music now?',
  'What was a bizarre phase or obsession you went through that your friends or family still tease you about?',
  'Think of a person who was a huge part of your daily life five years ago, but who you barely speak to now. What was your dynamic like?',
  'What was an article of clothing you wore until it practically fell apart, and why were you so attached to it?',
  'What was a routine, hobby, or tradition you used to have that you suddenly stopped doing one day without realizing it was the last time?',
];

const POOL: readonly string[] = [...DAILY_GENERIC_PROMPTS, ...RETROSPECTIVE_PROMPTS];

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Fresh copy of the full merged pool. */
export function promptPool(): string[] {
  return [...POOL];
}

/** Random opening prompt. */
export function randomOpeningPrompt(): string {
  return POOL[Math.floor(Math.random() * POOL.length)];
}

/**
 * N random alternatives, excluding the current prompt.
 * Used by the "change prompt" chooser.
 */
export function alternatesFor(current: string, n = 3): string[] {
  return shuffle(POOL.filter((p) => p !== current)).slice(0, n);
}