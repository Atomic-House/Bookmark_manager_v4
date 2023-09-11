
# Tech Stacks used here:

## Languages Used: Typescript, CSS, SQL

### Frameworks and tools used:

    Full Stack: Next.js(App router and Server compoenents)
    Styling and UI: TailwindCSS, ChakraUI, HeadlessUI
    Backend: Supabase, PostgreSQL, Prisma ORM
    Testing: Cypess, Jest
    Authentication: Next-Auth, OAuthGoogle, Nodemailer for Email
    File uploading: UploadThing
    State Management: Redux Toolkit
    Data Fetching on client: Tanstack Query

### Libraries and helpers used:

    Emoji Mart --> For emoji icons for each list
    Fuse.js --> for fuzzy searching bookmarks
    Faker.js --> for fake data
    Open Graph Scraper --> for Open Graph data

### Basic Info about the project

- The main app is inside the src folder
- Each file inside the src/app folder is a route
- The REST API where all the requests are made is inside the the src/app/api
  directory
- Inside the main folder/route our main user dashboard exists where most of the
  functionalities occour
- Inside the user folder/route our Authentication System exists
- Next-auth is used for Authentication with Email and Google Oauth as providers
- Our Database is PostgreSQL which is hosted in Supabase Cloud
- Prisma ORM is used for datafetching typesafety and data manipulation :-> Also
  used to avoid the risk of SQL injection
- UploadThing is used for file uploading User's profile picture, background
  picture, and UI background
- Fuse.js is used for fuzzy searching bookmarks
- Redux.js with Redux toolkit is used for complex state management
- Cypress is used for Component and end-to-end testing
- Schema for our backend is stored inside prisma/schema.prisma file
- Tanstack Query is used to fetch and mutatedata from the Rest API as client
  side
- Client side queries are made into custom hooks from useQuery are stored inside
  the src/functions/queries.ts folder
- Client side mutations are made into custom hooks from useMutation are stored
  inside the src/functions/mutations.ts folder

Usage and nesting overview structure

```bash
.
└── User
    └── Workspaces
        ├── Boards
        │   └── Tabs
        │       └── Lists
        │           └── Bookmarks
        └── Inbox
            └── Tabs
                └── Lists
                    └── Bookmarks
```

- Each workspace can have multiple boards but has only one Inbox

## Folder structure and description

```bash
.
├── cypress
│   ├── e2e
│   ├── fixtures
│   ├── plugins
│   └── support
├── public
└── src
    ├── app
    │   ├── api
    │   ├── main
    │   └── user
    ├── components
    │   ├── Bookmark
    │   ├── context
    │   ├── Create
    │   ├── Dnd
    │   ├── EmojiPicker
    │   ├── Filter
    │   ├── List
    │   ├── Modal
    │   ├── Navbar
    │   ├── Popover
    │   ├── Preferences
    │   ├── Profile
    │   ├── Search
    │   ├── Sidebar
    │   ├── Sort
    │   ├── Tabs
    │   ├── ThemeSwitch
    │   ├── UI
    │   └── View
    ├── functions
    ├── hooks
    ├── lib
    ├── slices
    ├── store
    ├── types
    └── utils
```

use command

```bash
tree -I 'node_modules|.next|prisma' -d -L 3
```
heck out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
