---
trigger: model_decision
description: A description of what the app is about as well as features that are a part of it
---

The general idea of this project is, to provide a chat like interface for Roleplaying conversations.

For example:

User 1: "The woman wears a long dark coat. It rains outside and she looks across the street. The man she is investigating walks out of a store, she cannot be seen!"
User 2: "John just walked outside the store after having bought some groceries. He spots the woman he saw earlier in the day yet again but before he was able to walk up to her she dissapears"

This should be display in a chat like interface. There can be multiple users responding, one person makes the chat room and can invite 1 or more people.
There should be a limit to the amount of people in any chat room, not more than 4 people including the initial user who created it.
I call the chatroom a "Roleplaying Scenario" or "Scenario" in short and I may refer to that name later on in this document.


## Users
The user should be able to upload an avatar, if none is present, an abreviation of their name will be shown.
An email is required for signin but will not be displayed on any public profile of a user.

It is also possible to add multiple OCs to their profile.
They can provide the name of their OC, a background story or any information they like and pictures of said OC so people they interact with can see who they are interacting with.


## Invitation
After a user has made a chatroom (or Scenario) they can then invite others. They can search for someone on the platform or copy an invite link
In case a user is already present and logged in, they will get a Toast notification mentioning they have been invited to a new Scenarion. There are two buttons, one to accept the invite and another to decline it.
Accepting it brings them into th Roleplay Scenario, denying it will notifify the user who invited them that they have declined.
Only the owner of the Scenario chatroom can invite others.

There is also a seperate page on the platform where users can view all of their invites and see the Scenario name, date of invite and who invited them.
That is show in a table like manner using Shadcn.

Invites will be valid for 7 days, after which they will be auto denied.
For this we need to make a Cron command with the laravel system for things like that.


## Chat
The chatrooms are called Roleplaying Scenarios or Scenarios in short.
This chatroom is going to be real time so we are going to use Laravel Reverb and Echo.

All users can select which of their OCs are going to be involved in the roleplay, this can be multiple.
If they need temporary (background) character they can then add them to a scenario manually.

Once characters are selected, they can be added to a RP reply (chat message). When that character has an image, the first one will be used as a small avatar next to the message.
Otherwise, an abreviation of the OCs name will be used instead (this is most likely going to be the way temporary characters are shown).

When a user is part of multiple Roleplaying Scenarios, an notification indication will be shown when there are new activities in that Scenario.

Furthermore, a seperate section in a Scenario acts like a scratch pad in which users can jot down ideas and talk about them.
No OC need to be selected for that as this is a free for all chat window. The window is called "Discussions".
However, this too should work like a normal chat does. No page refreshes for any new messages.





