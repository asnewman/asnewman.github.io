# Keeping Up With PRs in an Agentic World

We are in a period of rapid change in software engineering. Agents are pushing teams to new levels of velocity never seen before. Engineers are experiencing magnified productivity gains, while non-engineers are unlocking the ability to make code changes. As a result, we now have to figure out how to keep up with all the new incoming PRs.

Now, it's one thing to fully vibe code an app without caring about the code. But integrating agentic workflows into established, large, complex codebases is a completely different story. Relying on agents is not enough. We still need a human in the loop to review the code and verify that existing patterns are followed, that the code is easily understandable (to both humans and agents), and that the new changes work.

But we (humans) are quickly becoming the bottleneck, and we need to make significant shifts in how we conduct code reviews to keep up with the load. Here are a few things I believe we can do now to deal with this.

## Respect the Reviewer

The reviewer's time has always been precious, but the speed at which PRs can be created now makes it even more important. Sloppy PRs, poor descriptions, and bad code make the reviewer's life 10x harder. Either the reviewer will spend a lot of time on the review, or the review will be done haphazardly, which almost always bites a development team later.

As a result, PR authors need to be extra careful before requesting a review. A few general points to make sure the reviewer's time is protected:

1. Authors need to provide detailed context on what the problem is, why it's being solved, and the strategy for the solution. If the author cannot explain the solution adequately, it probably means they offloaded too much thinking to AI, and should either spend time understanding and validating the solution or delete the branch and start again.

2. Engineers, non-engineers, and AI all need to follow the team's standard PR practices. This typically means following a PR template, but can also include things like who is chosen as the reviewer. Anyone or thing that doesn't know about the standard practices needs to be informed ASAP.

3. Reviewers are encouraged to push back if any of the above are lacking or missing. Reviewers should not waste their time if the author of the PR has not put in adequate effort prior to asking for a review. Be firm and kind when doing this.

## Use AI to Help Reviews

AI can help with reviews in two ways:

1. Review the PR itself

2. Assist humans in reviewing

On the first point, there are many AI tools available that will review your code (I've been using CodeRabbit for a few months now). These AI reviewers are definitely noisy, but I'd say ~25% of the time they report valid feedback. They've definitely stopped bugs that I've written from going into production, which makes them worth it. The other pro is that they allow the author to start addressing feedback immediately while waiting for a human reviewer.

For the second point, I've had great success asking Claude Code to organize PRs by grouping relevant changes and gathering additional context from the surrounding code. It then walks me through the code chunk by chunk, making sure I fully understand the changes and agree with them. During the process, I can either let Claude note any comments I have or manually make them in GitHub. This is done through a [Claude skill](https://gist.github.com/asnewman/18460ddb5fbfb32b1aaadbb9d4cbcfe2), and it has both sped up my code reviews and made them more thorough. I highly recommend people try it out, especially if you tend to gloss over file changes during reviews.

## Be Honest and Transparent About AI Usage

I've written a post about [the importance of being transparent about AI usage](https://ajkprojects.com/getting-over-ai-shame.html), not for ethical reasons, but to help teammates work better together. With code and PRs, transparency allows authors to share prompts and technical plans discussed with agents in preparation for generating the solution. This information is generally more important than what can be understood by reading the code line by line.

---

So far, these are the methods I've been trying out to manage PRs. However, I'm sure I will need to keep experimenting and discovering new strategies, as I can only imagine the software world will keep moving faster. If you've tried something different and found it effective, please let me know.