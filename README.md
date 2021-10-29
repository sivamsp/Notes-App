## Notes App <img alt="NodeJS" src="https://img.shields.io/badge/NodeJS-16.10.0-blue">
Middle Typescript developer [Take Home Assignment](https://github.com/serokell/frontend-task-react) from Serokell

- This is Typescript / ReactJS / SCSS application bootstrapped with NextJS.
- The nextjs app uses customer router and is embedded in the json-server (refer `/server` folder)
- A single Mobx Store (refer `/note-store/note-store.ts`) is used to maintain global state. The application is server side rendered wherein the state is serialized in server and hydrated back on client (refer `/note-store/note-store-provider.ts`, `/pages/_app.tsx`).


### Instructions to run the web app and json-server 

```
> npm install
> npm run dev

open localhost:4000 in browser
```

<hr/>
<br/>

### Technical requirements Checklist

- [x] A fake API server should be setup. (used json-server)
- [x] The web app is setup using [__Typescript__](https://www.typescriptlang.org/),
   [__React__](https://reactjs.org/) and its commonly used library.
    - [x] Redux or Recoil are preferable for working with shared state but you can also use any other lib if it will help you. (used [MobX](https://mobx.js.org/))
    - [x] The code should use Typescript features.
    - [x] React hooks should be used.
- [x] There should be no CSS library/framework involved. (SCSS with BEM)
- [x] The solution should be put in a git repository and there must be instructions on how to run it.
- [x] Your code should be formatted in one style. (Prettier, Eslint and Stylelint)

### Acceptance Criteria Checklist

- [x] The main functionality includes:
    - [x] Show a list of notes
    - [x] Create a new note
    - [x] Edit a note
    - [x] Delete a note
    - [x] All actions __MUST__ communicate with the API.
- [x] Other functionality:
    - [x] Support routing (When refreshed, it should stay on the same page)
    - [x] An example of the routes:
        - [ ] Home page: `/` or `/home` (redirects to `/notes`)
        - [x] Create a new note: `/new`
        - [x] Edit a note: `/notes/{id}/edit`
        - [x] About page: `/about`
        - [x] Not found page: `/sth-random`
- [x] The mockup is provided only as reference. The final result should look like a real web app. (Used Google Keep as a reference for UX, did my best for UI 😅)

### Bonus Checklist

- [ ] Documentation 
- [x] Good design and animation
- [x] Server-side rendering is supported (Partial Hydration on client side)
- [ ] Containing unit tests and/or end-to-end tests
- [ ] Mobile availability (partially responsive)
- [ ] Bonus functionality (implement it only if you are sure that your application meets all base
   requirements):
    - [ ] Filtering and sorting
    - [ ] Note tags
    - [ ] If sorting is not selected or not implementing it should be possible to manage notes order
      using drag and drop
