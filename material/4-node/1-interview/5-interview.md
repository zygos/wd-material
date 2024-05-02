Part 5: Mock Technical Interview

Welcome to the final part of this sprint, where you will undergo the most comprehensive test of your skills yet: a mock technical interview. This interview is designed to simulate the experience of a real technical interview for a junior back-end web developer position, covering a wide range of topics from Node.js and TypeScript to databases and Express.js, as well as OOP, FP, data structures, algorithms, and basic system design.

Job interviews can be of various types:

- **coding** - this is the most common type of interview for software developers. You will be asked a few technical questions and you will have to solve a coding problem real-time.
- **behavioral** - assesses your soft skills, such as communication, teamwork, and problem-solving. You will have a separate mock interview for this later.
- **system design** - assesses your ability to architect a system. This type of interview is generally reserved for mid and senior-level positions.

We will focus on **the coding interview**.

## Preparation for the Interviewee (35 hours)

**Preparing for Technical Questions (15 hours)**

1. [Find 2 - 3 job postings](https://turingcollege.atlassian.net/wiki/spaces/MI/pages/626688001/Job+postings+for+mock+interviews) for a wanted position. **Include selected posting screenshots** inside the submission. The mock interview will be adapted to fit your choice of job postings so you are challenged in the areas you want to work in. If the job posting includes some non-familiar technologies, read up on them so you are at least familiar with their basics.
2. Go through the **introduction section** of [Tech Interview Handbook](https://www.techinterviewhandbook.org) to get an overview of the technical interview process. While we will focus on the coding interview, it's good to be aware of the other types of interviews you might encounter.
3. **Review topics covered** in this and previous sprints, focusing on understanding rather than memorization. You can get questions on any of the general programming and back-end topics, including Node.js, TypeScript, SQL/NoSQL databases, OOP, FP, data structures, and rudamentary system design. The distribution of questions will be based on the job postings you select. For example, if you select job postings that mention OOP, you can expect questions on OOP.
4. While quite often you will be provided with a remote coding environment, it's good to be prepared to run code on your local machine. **Ensure you have an environment ready to run TypeScript** (or JavaScript if your selected job listings do not mention TypeScript) for the live coding exercise. Install Express, a testing package of your choice (Vitest, Jest or equivalent), and any other tools you might need. You might not necessarily need or even be allowed to use all of these tools, but it's good to have them ready just in case, otherwise you would lose valuable time during the interview.

*Optional:*

- To refresh key terms, go through [Backend Cheats](https://github.com/cheatsnake/backend-cheats).

**Preparing for Live Coding Exercise (20 hours)**

1. Read the [coding interview preparation parts](https://www.techinterviewhandbook.org/coding-interview-prep/) of the Tech Interview Handbook.
2. **Practice solving coding problems** in TypeScript or JavaScript. You can use [LeetCode](https://leetcode.com/), [HackerRank](https://www.hackerrank.com/), and [Codewars](https://www.codewars.com/). We recommend going through [Grind 75](https://www.techinterviewhandbook.org/grind75?weeks=2&hours=15) and solving at least 10 problems.
3. **Practice your stack-specific skills**. If your job listings list particular packages that we have covered in this module, such as Express.js, you should practice implementing basic features in those technologies. For example, you could practice creating a pair of REST API endpoints with Express.js. Practicing more niche packages is not necessary, as you are expected to be able to learn them on the job.

*Optional*

- Watch [JS coding interview recordings](https://interviewing.io/mocks?language=javascript).
- Book [additional mock coding interviews](https://www.techinterviewhandbook.org/mock-interviews/).

## Preparation for the Interviewer (5 hours+)

No matter if you will be carrying out a mock interview for your peer, you still need to prepare for the interviewer role.

**Preparing for Technical Questions (2 hours)**

Prepare a list of 15 technical questions covering the range of topics mentioned. You will ask 4 - 6 questions out of this list during the interview. Ensure these questions vary in difficulty and cover both theoretical knowledge and practical application.

Some sample questions:

1. What is Node.js?
2. What is the difference between `any` and `unknown` in TypeScript?
3. What is load balancing?
4. What is the purpose of foreign keys in a SQL database?
5. Can you explain the concept of inheritance in object-oriented programming?
6. What is the difference between a stack and a queue?
7. What are generics in TypeScript?
8. How can you handle errors in an Express.js application?
9. Could you provide three use cases when a NoSQL database would be preferred to a relational database?
10. Have you heard about SOLID OOP principles? What does "Dependency inversion principle" refer to?
11. What is the difference between streams and buffers in Node.js?
12. How would you implement rate limiting in an Express.js application?
13. How would you implement pagination in a RESTful API?
14. Can you compare and contrast procedural, functional and object-oriented programming paradigms?
15. At a very high level, how would you design a basic URL shortening service?

**Preparing for Live Coding Exercise (3 hours)**

Prepare 2 coding problems and their solutions for the live coding exercise that you would use in your role as an interviewer. Prepare a folder for each problem, including a problem description, a solution, and test cases.

  - **Algorithms and data structures** - e.g., a LeetCode-like problem requiring to iterate through lists, objects, or trees.
  - **API endpoint design** - e.g., proposing and a implementing a 1 - 3 RESTful API endpoints for a specific use case.

- If a problem demands implementing a particular function or class, it should provide some desired usage example.
- Ideally, each problem is layered so that the interviewee is introduced to the problem in 2 stages: first, they solve a simpler version of the problem, and then they are asked to upgrade their solution to handle some new requirements.
- The problem should be solvable within 30 minutes.

## Reviewer role

**STLs should consult [the following document](https://docs.google.com/document/d/1z9SF5aPyTwFVtaNOLguLW_rBHG90zdn_BG1YWbxztHA/edit?usp=sharing) on question and problem selection.**

Before the interview, **select the most relevant questions and a coding problem** based on the submitted job postings.

Assume a persona of a team lead in one of the companies from the provided job postings. You are looking for a junior back-end developer to join your team. You will be conducting a mock technical interview with a candidate who has applied for the position. Your goal is to assess the candidate's technical knowledge, problem-solving skills, and coding ability.

## Interview Procedure

This interview will consist of three parts:

1. **Introduction (up to 5 min).** The interviewer will introduce themselves and explain the structure of the interview. They will also ask you to introduce yourself and provide a brief overview of your background and experience. However, try to keep this part brief, as spending too much time makes it harder to finish the interview on time. You would not want to leave less time for the coding part, which is the most important part of the interview.
2. **Technical Questions (5 - 10 min).** You will be asked 4 - 6 technical questions that cover some topics studied in this and previous modules. Unless prompted, you should not go too much into details as that will take time away from the coding part. Reviewer can ask follow-up questions to clarify your answers or test your knowledge further.
3. **Live Coding Exercise (30 - 40 min).** You will be given one or more coding problems to solve. Interviewee has to make sure you understand the problem. Some requirements might be ambiguous or some edge cases might not be clear. This is the time to ask for questions. Clarify the requirements and constraints of the problem is a part of any real-world development task. Once the requirements are clear, start writing a solution to the problem while thinking out loud. The interviewer will be following your thought process.

Interviewee will not be able to use any online resources during the interview unless the interviewer explicitly allows it.

Additional time can be allocated for feedback and discussion at the end of the interview if both parties agree.

## Evaluation Criteria

- **Communication and Soft Skills.** Ability to clearly articulate thoughts, explain reasoning, and communicate effectively throughout the interview. Interviewer had no challenge following the candidate's thought process at all.
- **Technical Knowledge.** Learner answered all questions correctly and demonstrated a deep understanding of the topics covered in the interview.
// MUST: replace sentence below
- **Problem Solving.** Demonstrated a structured problem-solving approach, breaking down problems into smaller steps. Exhibited the ability to identify and debug solutions within the given timeframe.
- **Technical Competency**. Translates discussed solution into clean and straightforward implementation with minimal to no bugs. Solution has no unnecessary code and uses the right level of abstraction.
- **Testing and Edge Cases.** Came up with various edge cases and tested their solution. Identified and self-corrected bugs in code.

# Submission

This project will require both an STL and a Peer review.

For your interview, you will need to submit:

- **Selected job posting screenshots** for the mock interview ordered by preference. You can name them `job-posting-1.png`, `job-posting-2.png`, etc.
- **A text file with a list of 15 questions** you would use for carrying a mock interview for your peer.
- **Two folders with the coding problem descriptions, solutions and test cases** for the live coding exercise. Name the folders `problem-1` and `problem-2`.

Submitting a list of questions and coding problems is **optional** for the peer review and **mandatory** for the STL review.

**Estimate average time to prepare: 40 hours**
