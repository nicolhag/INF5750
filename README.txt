To run our webapp using DHIS Live:

*Approach 1*
1. Clone the whole project into "dhis-live/conf/apps/".
2. The app should now be available through "App Management" in DHIS.

*Approach 2*
1. Zip the contents into a folder called "MnM"
2. Upload to a running DHIS live test-server (optionally: Put the MnM-folder under the folder dhis-live/conf/apps/)

*Implementation details*
The webapp will automatically decide who it will send the commodity order to. It does so according to the following procedure:
1. Determine the Organizational Unit (OU) of the current user.
2. Determine the parent OU.
3. Send the order to all users in the user group specified at the top of request_handler.js (currently "Logistics").

- If the application finds no users in the specified group in the parent OU, then no order will be sent. The only exception is
if the user belongs to the top level OU; then the order will be sent to the users in the specified user group at the current
level. Consequently, if the specified user group does not exist, no order will ever be sent.

Because of this, some configuration is required in order to test the web app. These are:
1. The "Logistics" user group must be created.
2. A user above the lowest OU level must be member of the "Logistics" user group.
3. One level down in the hierarchy there must exist a user.

To test the app, you have to log in with the user from step 3 and send a commodity order.
The order should then be sent to the user from step 2.
For more thorough testing, more users can be added to the group.

The easiest way to configure this is to load the sample data, and create the Logistics user group.
Thereafter add the user "Alain Traore" (username traore) in the "Sierra Leone" OU to the "Logistics" user group.
Then log in with the user "Seydou Keita" (username keita) in the "Bo" OU and send a commodity order with the app.
Check that the order is sent to "Alain Traore".


*How to use*
- A list of commidities are hardcoded into the search suggestion algorithm (see 'commidity_search_handler.js').
- Try for example to enter 'M' in the input field, and you will get a list of commodities starting with 'M'
- You may enter variable types of commidities by adding new forms with the '+'-button.
- When you hit send, the forms are validated and a message will be displayed at the top of the webpage.
