# Features of this app

1. A very simple To-Do-List with Only Create Functionality.
2. Using Node Persist to store data in the backend.
3. Clearing node-persist data when the application restarts.

# The application restart and removing node-persist values.

1. The app.listen function in the index js has the storage.clear() function to clear the values


# I got this app working but then I started wondering why it Worked!

1. I found the solution but then I tried figuring out why this app is working if I am not using the useState variable anywhere.


Then I found out that, 
# This app relies heavily on useEffect to keep track of localStorage values.

1. I have used useEffect and useState both. But useState variable is not used anywhere.


# After the api call that gets the data from the backend, localStorage is used to keep track of the state.