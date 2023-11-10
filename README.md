# Tech Stacks used here:

## Languages Used: Typescript, CSS, SQL, HTML

### Frameworks and tools used:

    Full Stack: Next.js(App router and Server compoenents)
    Styling and UI: TailwindCSS, DaisyUI
    Backend: Linode, Docker, PostgreSQL, Drizzle ORM
    Testing: Cypess, Jest
    Authentication: Next-Auth, OAuthGoogle, Nodemailer for Email
    File uploading: UploadThing
    State Management: React Context API
    Data Fetching on client: Tanstack Query

### Libraries and helpers used:

    Emoji Mart --> For emoji icons for each list
    Fuse.js --> for fuzzy searching bookmarks
    Faker.js --> for fake data
    Open Graph Scraper --> for Open Graph data### Basic Info about the project

- The main app is inside the src folder
- Each file inside the src/app folder is a route
- The REST API where all the requests are made is inside the src/app/api
  directory
- Inside the main folder/route our main user dashboard exists where most of the
  functionalities occour
- Inside the user folder/route our Authentication System exists
- Next-auth is used for Authentication with Email and Google Oauth as providers
- Our Database is PostgreSQL which is hosted in a Debian Linode server
- Drizzle ORM is used for REST API Client in the backend :-> Also
  used to avoid the risk of SQL injection
- UploadThing is used for file uploading User's profile picture, background
  picture, and UI background
- Fuse.js is used for fuzzy searching bookmarks
- React Context API is used for complex state management
- Cypress is used for Component and end-to-end testing
- Schema for our backend is stored inside src/schema folder
- Tanstack Query is used to fetch and mutate data from the Rest API as client
  side
- Client side queries are made into custom hooks from useQuery are stored inside
  the src/hooks/ folder
- Client side mutations are made into custom hooks from useMutation are stored
  inside the src/functions/ folder

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
│   ├── fixtures
│   └── support
├── public
└── src
    ├── app
    │   ├── api
    │   │   ├── auth
    │   │   ├── data
    │   │   ├── tests
    │   │   └── trash
    │   ├── (auth)
    │   │   └── signin
    │   ├── (main)
    │   │   ├── board
    │   │   ├── inbox
    │   │   ├── members
    │   │   └── trash
    │   ├── (root)
    │   └── (workspace)
    │       └── new
    ├── components
    │   ├── Add
    │   ├── Bookmark
    │   │   └── components
    │   ├── Icon
    │   ├── LayoutFilterSort
    │   │   └── components
    │   ├── List
    │   │   └── components
    │   ├── Members
    │   │   └── components
    │   ├── Navbar
    │   │   └── components
    │   ├── Popover
    │   │   └── custom
    │   ├── Profile
    │   │   └── components
    │   ├── Sidebar
    │   │   └── components
    │   ├── Theme
    │   ├── ThemeSwitch
    │   ├── Trash
    │   ├── UI
    │   │   └── components
    │   └── View
    │       └── components
    ├── context
    ├── functions
    ├── hooks
    ├── lib
    ├── schema
    ├── server
    ├── svgs
    └── utils


```

use command

```bash
tree -I 'node_modules|.next|drizzle' -d -L 3
```

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
