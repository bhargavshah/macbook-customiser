# Smells

- Using imperative array loops

    Mutation and temporary variable mess

- Coupling of fetch IO operations with local state management

- Nested ternaries
    1) Use && based conditionals if the states are mutually exclusive and simple to follow
    2) If states are not mutually exclusive, defer state based conditional rendering to a component

- Logic unnecessarily lifted to parent

    Does the App component need to know about calculating / knowing addon price? If not move it to the child component who owns displaying that data

- View model mutation
