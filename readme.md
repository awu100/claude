# Claude

Claude is a Discord bot for GTA 5 Online crews

## Commands

### Uptime

`!uptime` - when sent to Claude as a DM, it will return the uptime for each instance running.

### Sale

#### Adding a sale to the queue

`!sale [some text with sale details]` - when posted in a channel named `session-chat`, this command will post a message in a channel called `sales-queue`.

The `sales-queue` channel must be in the same **category** as `session-chat`. This will still work when neither channel are in a category.

Ideally only Claude would have permission to post messages to the `sales-queue`.

#### Removing a sale from the queue

Adding any emoji reaction to your own sale will remove it from the queue.
