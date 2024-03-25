Part 3: Agile Methodologies

# Part Introduction

Software development used to be a slow and rigid process. Often, development teams would spend months laboring away in isolation only to find out their product didn't match what customers needed. This linear approach frequently led to missed deadlines, cost overruns, and unhappy customers. Subsequently, this approach was coined as the "waterfall" model.

Agile methodologies flipped this approach on its head. Agile emphasizes flexibility, collaboration, and continuous delivery to get the right products into users' hands faster. It's the guiding philosophy behind many of the most successful software companies today.

In this part, we'll dive into the basics of Agile. You'll explore popular methodologies like Scrum and Kanban and learn how to apply these directly to your capstone project for a more structured, user-focused development process.

Finally, we will examine how to apply Agile principles and standard industry tools to manage your capstone project.

# Key learning topics & resources

## Software Development Life Cycle (0.5 hours)

- Watch: [Software Development Life Cycle](https://www.youtube.com/watch?v=SaCYkPD4_K0) (30 min)

This will give you a high-level overview of the software development life cycle. In the following sections, we will explore most of the methodologies mentioned.

## The Waterfall Model (0.5 hours)

- Read: [Waterfall methodology](https://www.atlassian.com/agile/project-management/waterfall-methodology) (15 min)
- Read: [Product Requirements Document](https://en.wikipedia.org/wiki/Product_requirements_document) (10 min)

The waterfall model is usually used when dealing with stakeholders that demand a fixed project scope, budget, and a detailed plan with a clear timeline and deliverables. It's common when freelancing, building one-off projects, or working with non-technical clients.

It is very intuitive if you see your project as a "thing" that you build, and then you're done. But it's not very good at dealing with change and moving targets.

## Agile (0.5 hours)

- Read: [Agile manifesto](https://agilemanifesto.org/) and [12 principles](https://agilemanifesto.org/principles.html) (30 min)

The Agile Manifesto website, with its iconic background image, has become part of software project management lore. It was written in 2001 by a group of software developers frustrated with the traditional "waterfall" software development model. They wanted to create a more flexible, responsive, and human-centered approach to software development.

Agile is a set of values and principles that guide software development. It's not a strict set of rules or an all-encompassing set of practices. It's more like a set of guidelines you can use to decide how to approach your work.

While Agile can be considered the guiding philosophy, many different frameworks have been developed to implement it. In the next section, we'll examine a few of the most popular ones.

Most of these methodologies share a few key principles:

- They are iterative, meaning they break the project into smaller pieces and deliver them incrementally.
- Various project parts are developed in parallel rather than in a sequence.
- Feedback, communication, and collaboration are emphasized within the development team and with stakeholders. "Optimism is an occupational hazard of programming. Feedback is the treatment." - Kent Beck

## Agile Methodologies (2.5 hours)

- Watch: [Agile frameworks](https://www.youtube.com/watch?v=fnlXe9cbols) (30 min)

We will review the most popular Agile methodologies: Scrum, Kanban, and Extreme Programming (XP). There are more methodologies, but these three cover the most ground.

**Kanban**

- Read and Watch: [Kanban](https://www.atlassian.com/agile/kanban) (25 min)
- Example: [Buffer's Product Roadmap](https://trello.com/b/PDIV7XW3/buffer-transparent-product-roadmap) (10 min)
- Review: [Kanban Simulation](http://www.kanbansim.org/boards/1df0bf1f1fe4c9b9fcd84f1147fb83bd) (15 min)

Kanban (Japanese for "signboard") is one of the more straightforward Agile methodologies. Kanban is based on using a particular type of board to visualize the current state of work in progress with a few ideas built around it to apply Agile values and principles.

We want to limit Work In Progress (WIP) to force the team to focus on finishing tasks before starting new ones and to improve flexibility. If the situation changes and we have to change, we need to work on it; it is much easier if we have fewer things in progress.

We want to visualize the flow of work to help us identify bottlenecks and areas for improvement.

While the board is undoubtedly the most iconic part of Kanban, it's not the only part. Kanban in software development can have a few more practices, such as:

- **Daily standups** - short (~15 min) meetings where the team discusses what they did yesterday, what they plan to do today, and any obstacles they face.
- **Demos** - regular meetings where the team shows off their work to stakeholders. There can also be more frequent "mini demos" where the team members show off the work they have done to each other.
- **Retrospectives** - regular meetings where the team discusses what went well, what didn't go well, and what they can do to improve.

**Scrum**

- Watch: [Difference between Scrum vs. Kanban](https://www.youtube.com/watch?v=rIaz-l1Kf8w) (10 min)
- Watch: [Kanban and Scrum](https://www.youtube.com/watch?v=19dMPv0pOGE) (10 min)
- Read: [Scrum Guide](https://scrumguides.org/scrum-guide.html) (30 min)
- Read: [Scrum Glossary](https://www.scrum.org/resources/scrum-glossary) (30 min)

Scrum is another very popular Agile methodology. It is based on the idea of "sprints", which are short, time-boxed work periods. A sprint is usually 2-4 weeks long, and the team should have a potentially shippable product increment at the end of the sprint.

In its roughest form, Scrum can be seen as Kanban with sprints. It has a few more ceremonies than Kanban, such as:

- **Sprint planning** - a meeting at the beginning of the sprint where the team decides what they will work on during the sprint.
- **Daily scrum** - is pretty much the same as a standup
- **Sprint demo** - a demo at the end of the sprint where the team shows off the work they have done to stakeholders
- **Sprint retrospective** - a meeting at the end of the sprint where the team discusses what went well, what didn't go well, and what they can do to improve.

**Note.** The Daily Scrum is also often called a "standup meeting" or just "standup." While you might already be familiar with Standups through Turing College, they are not representative of Daily Scrum standups. In Scrum, these meetings are generally (or at least ideally) time-boxed to 15 minutes and do not involve the free-form discussion and QA in our TC standups.

**Extreme Programming (XP)**

While Scrum and Kanban focus on software development, Extreme Programming (XP) is focused on taking best programming practices to the extreme, hence the name. Although XP predates the Agile manifesto, it is still considered under the Agile umbrella due to its alignment with Agile principles. Also, a few key XP practitioners are signatories of the Agile Manifesto.

While we could compare it to Scrum and Kanban, we'll focus on the technical XP practices that are more well-known and occasionally used with other Agile methodologies.

Most of these practices focus on improving code quality and development speed. By speed, we do not mean "how much code you can write in a day" but rather "how quickly you can deliver value to the customer." If we deliver less code but more value—what the user actually wants—we are doing better.

Some of these practices you have already seen in the course, and some of them you might have heard of. Here are a few of the most well-known:

- It is a good idea to work on what is necessary to the user, not much more. Therefore, we should only develop features backed by user needs, which the user specifies. These needs can be defined through **user stories** - informal, natural language descriptions of features. For example:

As a `((role))` I can `((capability))`, so that `((receive benefit))`.

As a **customer**, I can **pay for my order with my phone**, so that **I don't have to carry my wallet**.

These stories should be backed by **acceptance tests** - tests that validate that the user story is complete.

It is good practice to test our applications earlier in the development process and often so we stay on the path and ensure that the code is working as expected. Taken to an extreme, we should start with tests and only then write the implementation. This is called **test-driven development**. It is a way to ensure that the code is written to be testable and that it meets the requirements.

- It is a good idea to have frequent feedback and code reviews. What is the extreme version of frequent code reviews? Continuous real-time review of every line of code as we write it. This is called **pair programming**. XP suggests that this should be done not as a "once in a while" thing but as a regular practice for all production code.

While XP has a few more practices and principles, these are the most well-known and often used when combining XP with other Agile methodologies.

**Note.** Companies can mix and match these methodologies to fit their needs. For example, a company might use Scrum with Kanban (called "Scrumban") or Scrum with some XP practices, such as TDD and pair programming.

**Reminder.** Agile frameworks are a great way to organize your work and share a set of ceremonies and practices with a team. However, these methodologies should not take center stage over the Agile principles. Do not miss the forest for the trees. It can be easy to get so caught up in these processes that you forget the reason they are there in the first place. When in doubt, you can get back to the Agile Manifesto and the 12 principles.

## Exercise: Applying Agile for your Capstone Project (4 hours+)

We will gently roll up our sleeves and prepare for your capstone project. You are expected to:

- apply some of the Agile principles and practices to your capstone project
- use some industry-standard tools to manage your project

Here are a few things you should do:

1. **User Stories**

- Clearly define your project's target audience.
- Write 3 - 5 user stories from their perspective, following the format: As a [type of user], I want to [capability], so that [benefit]. You can use slightly different wording if it makes more sense for your project.
- These stories will guide your priorities, keeping your project grounded in real user needs.
- Whenever possible, **talk to your potential users** to identify, validate, and prioritize user stories. Maybe some of your peers, colleagues, or friends can help you with this? You should urge them to be **brutally honest** with you about what they need and what they don't need. Any sugarcoating will only hurt your project and drain your time. Would a feature be "nice to have" or "need to have"? Would they pay for it?

2. **Kanban**

- Choose a tool: Jira is popular, but GitHub Projects is an easy option for this project.
- Create columns on your board like:
  - "Backlog" - where you keep all your tasks
  - "To Do" - what you plan to work on this sprint
  - "In Progress" - what you're currently working on
  - "Testing" - what you are refining and testing
  - "Done" - what you have completed

Start breaking your project into smaller, manageable tasks and add them as cards under "Backlog". Most of these tasks should be derived from your user stories.

3. **Mini-Sprints & Estimation**

- Think about short one-week sprints, 2 - 4 sprints in total.
- For each sprint, select a few cards from your board that you realistically think you can complete.
- Try to estimate how many hours each task might take. Initially, it's okay to guess.

4. **Progress Tracking**

- As you work, move your task cards across the Kanban board.
- Track the time you spent on each task. Did your time estimations match reality? Keep notes to improve future estimations.
- If your assumptions change, move tasks back to "To Do" and adjust your plan.

5. **Retrospective and Iteration**

At the end of each mini-sprint, reflect on your progress:

- What went well?
- Where did you face challenges?
- What could be done differently for the next sprint?
- Adjust your plan based on what you learn.

6. **User Feedback**

Even with a partially built project, seek early feedback from potential users (friends, coworkers, other learners, etc.). Do not delay this until the end of the project. If you are showing your progress to a potential user and not feeling uncomfortable, you are probably not showing it early enough. Do your features align with their expectations? This aligns with the Agile principle of rapid iterations based on feedback. This is a more critical practice than simply using a popular project management tool. Coordinating with your users and adapting to their needs over your assumptions or solitary vision will go a long way in achieving your capstone project's Agile requirements.

Of course, you might have some challenges gathering user feedback for some projects. If you are building a tool for a particular audience, you might not have access to them. In this case, ask your peers on TC Discord channels and look for online communities or social media groups that match your target audience. While more than face-to-face feedback, it's better than nothing. Avoiding external feedback and only superficially applying Agile tooling and not the underlying principles will result in a grade reduction in a capstone project.

Right now, **spend at least a few hours on the first three steps**. You must continue with the rest of the steps as you progress through your capstone project.

# Directions for further research (1 hour+)

- How is Agile different from "waterfall, but every two weeks"?
- What is an honest estimate? What makes an estimate useful?
- How does DevOps apply some of the Agile principles to the operations side of software development?
