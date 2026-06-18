# Bet On Centaurs

In 1996, IBM's specialized chess supercomputer, Deep Blue, faced Garry Kasparov, arguably the greatest chess player of all time. The world champion and computer played six games. Deep Blue won the first game, Kasparov won three, and two ended in draws. Although Kasparov won the match overall, it was the first time a computer had defeated a reigning world champion.

When they played again in 1997, Deep Blue was stronger. It defeated Kasparov twice, drew three games, and lost only once. By then, it was clear the computer had gained an advantage through advanced pattern-matching algorithms that allowed it to evaluate positions and calculate variations far beyond what a human could process.

Yet even with this advantage, Kasparov brought something to the board that prevented Deep Blue from achieving flawless victory every time.

After his defeat in 1997, Kasparov helped popularize a new format called Advanced Chess. Often compared to a centaur, Advanced Chess combines a human and a computer, pairing a person's strategic thinking, judgment, and time management with a machine's pattern-matching abilities. Players were allowed to use their computer partner to its fullest extent, but final decisions always remained in human hands.

It was quickly observed that centaur pairings produced surprising results:

* A modest human-computer pairing could beat a grandmaster.
* A modest human-computer pairing could beat a chess supercomputer.
* A modest player working effectively with a modest computer could beat a stronger player working ineffectively with a stronger computer.

This leads to a conclusion many rational people are arriving at today: if you want to win in an AI-driven world, you do not replace people with AI. You help people become skilled at working with AI. If you believe AI should completely replace knowledge work, or you reject AI because it can be wrong, you will lose.

Even if you agree with that sentiment, you still need to be careful. The goal is to work with AI, not let it take the reins.

I almost fell into this trap the other day.

Fable had just launched, and everyone on X was posting about running agents in loops. So, I decided to let an agent run overnight to investigate a performance issue in some frontend code at work.

When I woke up, I found that a page containing generated test data was loading in under a second. This was exciting because I had gone to bed with the page completely crashing my browser due to the volume of data it was trying to render.

To achieve this improvement, Fable had implemented a double-nested virtualized list. A virtualized list renders only elements currently visible on the screen, loading additional content as the user scrolls. Because of the way the data was structured, a nested approach was required.

I was happy to see the page loading, so I started reviewing the changes. At first glance, I could not fully understand how the nested virtualized list worked. There was a fair amount of complexity involved in passing scroll state from the outer list to the inner one. I was one click away from giving up and leaving a comment on my pull request that said, "I don't understand it, but it works 🤷."

Instead, I stopped and spent the next 45 minutes asking Claude to teach me the underlying concepts and how they related to the implementation. Through that process, I developed a much deeper understanding of how the nested virtualized list worked. More importantly, I uncovered several flaws in the implementation that were then fixed. In that sense, Claude and I worked together to produce the best solution we could.

There is no doubt in my mind that pairing AI with capable humans is the best path forward. There are still things humans can do that AI cannot, especially when people apply effort, judgment, and creativity, and I believe this is true across many fields, from programming to chess to autonomous vehicles.
