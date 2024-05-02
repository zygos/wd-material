Part 5: Habit-tracking App

In this assignment, you will be introduced to slightly more data modeling and shared state management. Given your new set of tools, we are excited to see what you will build!

## Project Description

In this project, you will develop a habit-tracking application to help people stick to new daily habits, such as working out, reading, meditating, and more.

**Note.** While this project is quite extensive, do not stress out about getting everything perfect. This is not the last time you will be working on this project 😉

## Application Requirements

**Main View**:

1. The main view should have two sections: navigation between days and a habit list.
2. Navigation between days: Users should be able to navigate between days to view the habits they completed on any specific day. Consider using a navigation method that is more intuitive than a date picker, especially for the past 7 days.
3. Users should be able to mark or unmark their habit completion on any previous day but not on future days. You may either disable navigation to future days or display a message indicating that users cannot mark habits for future days.
4. Habit List: This section should display the daily habits that a user is tracking.
5. Habit List Items: Users should be able to mark or unmark a habit as completed for the day. You can indicate this using a checkbox, toggle button, or any other method.
6. As users navigate between days, their URL should change to a unique URL pointing to that specific day. Users should be able to navigate to the same date by visiting the same URL in the browser. For example, `/day/2023-07-29` should display the same view the user would see if they navigated to that day using the navigation buttons/calendar.

**Adding New Habits**:

1. Users should be able to add new habits by entering the habit's name. This can be accomplished on a separate page linked from the main view, through a popup modal activated with a button, or directly in the habit list.

**User Experience**:

1. The application should be responsive and compatible with mobile, tablet, and desktop resolutions, primarily focusing on mobile view.
2. The application should handle and display errors in a user-friendly manner.
3. The application should be intuitive and easy to use. Bonus points for beautiful design and animations.
4. Feel free to deviate from the provided requirements if it enhances the user experience. However, you might need to justify your decisions during the review.

**Selected Feature**:

In this assignment, you are required to implement **at least one of the following features**, which you can choose based on your interest or a technical challenge you would like to tackle:

A. (State management) Habit Management: Users should be able to edit, stop, and delete habits. When editing a habit, users should be able to change the habit's name. Stopping a habit should remove it from the habit list from that point forward. Deleting a habit should remove it from the habit list and delete all its daily records. You can use a separate page or popup or allow the user to perform these actions directly from the habit list.
B. (Computed properties) Habit Streaks: Users should be encouraged not to break a habit. If a habit item has been completed for 3 or more consecutive days, it should display the number of consecutive days it was completed. The streak should be displayed according to the date of the currently viewed day (not necessarily today). If it is the user's longest streak for that particular habit, it should be highlighted in some way.
C. (Data modeling) Habit Categories: Users should be able to categorize their habits into categories such as "Health", "Work", "Hobbies", etc. Users should be able to select a category when adding a new habit, and these categories should be used to visually group habits in the habit list. Users should be able to add new categories and edit existing categories. The precise implementation of this feature is up to you.
D. (User Experience) User onboarding: To reduce the number of users dropping off before trying out the app, when a user visits the application for the first time, they should be presented with a short onboarding process that explains how to use the application and presents a list of suggested habits to add. The user should be able to skip the onboarding process and view it again later.

You may choose to implement more than one feature, but it is not required.

## Technical Requirements

- Use Vite as a build tool.
- Use Vue 3 with the Composition API.
- Use Vue Router for client-side routing. Navigation should not cause a page to reload.
- Use localStorage to store the user's habit records so they persist when the user refreshes the page.
- Design your app using a component-based architecture.
- You may use a UI framework or additional JavaScript packages to assist with the project. These packages should be managed using npm and imported into your project instead of being linked directly in your HTML file.
- Consider aspects like page layout, colors, typography, use of icons, illustrations, photos, etc. You can find some inspiration on [Dribbble](https://dribbble.com/search/habit-tracker).
- Use ESLint and Prettier to enforce code quality. According to your rule configuration, your code should not have any errors or warnings. Add Stylelint if you are going the extra mile.
- Use code colocation by organizing related code into components or modules when it reasonably makes sense.
- The application will be viewed in the production mode (`npm run build` and `npm run preview`). Ensure that your application works in the production mode.

## Bonus Challenges

If the main requirements are not challenging enough, you are encouraged to select and implement some of the following features in addition to the main requirements:

- Allow the user to add a custom habit icon.
- Allow switching between light and dark mode.
- Add animations and transitions that celebrate the user's progress.
- Use Pinia for state management.
- Sync the habit data between tabs so changes in one tab are reflected in other tabs.
- Allow the user to use your application entirely using the keyboard.
- Use TypeScript and SCSS.
- Allow your application to be installed on a device as a Progressive Web App (PWA) and used offline.

## Hints

- Consider creating logic for habits and habit daily records as separate modules in the `src/stores` folder. Then, decide how to identify which habit's daily record belongs to which habit.
- Consider using [Vue Router `useRoute`](https://router.vuejs.org/guide/advanced/composition-api.html) to get access to the current route's parameters.
- Optionally, you can try out using a library such as [VueUse](https://vueuse.org/functions.html) [for LocalStorage](https://vueuse.org/core/useLocalStorage/), [dark mode](https://vueuse.org/core/useDark/), etc.

## Reviewer Role

Present your application as if you are presenting to a potential user who primarily cares about ease of use. Then, explain the technical aspects to the reviewer as if you are communicating with a senior developer, focusing on your program structure and the challenges you encountered.

## Project Evaluation Criteria

- **Habit tracking functionality**. The application tracks and stores user habits, allows marking habits as completed, and includes your custom feature.
- **Navigation functionality**. The application allows users to navigate between days and view the habits that were completed on any specific day.
- **User experience**. The application is pleasant, intuitive, and easy to use.
- **Ease of making changes**. The application is modeled in a way that makes it easy to change or add features by using a component-based architecture and minimal to no direct DOM manipulation.
- **Code organization**. Small components and functions are organized into files and folders by their use and principle of colocation (Locality of Behaviour) - "Things that change together should be located together", while shared components and functions are located in a shared folder.
- **Consistent code style**. Your project adheres to your code quality rules. There are no errors or warnings according to your ESLint and Prettier configurations. Minimal or no use of linter-disabling comments.

During a task review, you may be asked questions that test your understanding of covered topics.

**Sample Questions for a Reviewer to Ask (Reviewers are encouraged and expected to think of more!)**

- How have you organized your code so a new developer could understand it?
- How have you implemented shared state?
- How do you handle and display errors?
- What are some edge cases that you have considered?

# Submission

To submit the project and allow the reviewer to view your work beforehand, go to your GitHub repository by clicking on the GitHub icon above. Next, select "Add File"->"Upload Files". Choose the files you worked on to upload them, then click the green "Commit changes" button.

Once you have completed all the steps of the project and uploaded your work, go to the Turing Platform and click the "Submit Project" button to complete it. The platform then allows you to see the times when reviewers are available to have a call with you and review the project. Simply book a time that suits you. If there are no times available, feel free to write a message in the #wd_reviews_scheduling channel on Discord.

Read an in-depth guide about reviews here: https://turingcollege.atlassian.net/wiki/spaces/DLG/pages/537395951/Peer+expert+reviews+corrections

**Estimated average time to complete: 20 hours**
