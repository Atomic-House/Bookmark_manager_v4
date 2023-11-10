# July, 2023

## Languages Used: Javascript, CSS, NoSQL, HTML

### Frameworks and tools used:

    Frontend: React.js
    Styling and UI: TailwindCSS, ChakraUI, HorizonUI
    Build Tool: React scripts
    Dev Tool: React scripts
    Backend: Appwrite, DigitalOcean
    Authentication:  Email
    State Management: Redux Toolkit
    Data Fetching on client: Tanstack Query

### Libraries and helpers used:

    Link preview from RapidAPI --> for Open Graph data

#### Features Existed

- Authentication
- Lists
- Boards
- Link preview

##### Problems Faced

    - Dev server was extremely slow
    - No type checking system made the app vulnerable
    - Heavy client side state managements
    - Inbuilt UI had great difficulty to navigate through

---

# August, 2023

## Languages Used: Typescript, CSS, SQL, HTML

### Frameworks and tools used:

    Frontend: Next.js(App router & Server components)
    Build Tool: Webpack(Next.js in built)
    Dev Tool: Turbopack
    Styling and UI: TailwindCSS, DaisyUI
    Backend: Supabase, PrismaORM, PostgreSQL
    Authentication:  Email, NextAuth, OAuth-Google
    State Management: Redux Toolkit
    Data Fetching on client: Tanstack Query

### Libraries and helpers used:

    Link preview from RapidAPI --> for Open Graph data

#### Features And Changes

    - Authentication:
      -- OAuth Google
      -- Email magic link
      -- Credentials
    - Lists functionality
    - Workspaces
    - Added Vite as dev and build tool for faster developement speed

##### Problems Faced

    - Auto fetching link was not working
    - Database speed were slow
    - Client side app was heavy and clunky
    - Poor state management

---

# September, 2023

## Languages Used: Typescript, CSS, SQL, HTML

### Frameworks and tools used:

    Frontend: Next.js(App router & Server components)
    Build Tool: Webpack(Next.js in built)
    Dev Tool: Turbopack
    Styling and UI: TailwindCSS, DaisyUI
    Backend: Supabase, Drizzle ORM, PostgreSQL
    Testing: Cypess, Jest
    Authentication:  Email, NextAuth, OAuth-Google
    State Management: React Context API
    Data Fetching on client: Tanstack Query

### Libraries and helpers used:

    Emoji Mart --> For emoji icons for each list
    Fuse.js --> for fuzzy searching bookmarks
    Faker.js --> for fake data
    Open Graph Scraper --> for Open Graph data

#### Features And Changes

    - Fuzzy Searching Lists
    - Fixing Performance on client side by removing ChakraUI and Redux
    - Better and lighter state management with React Context
    - Server side rendered pages and routing
    - Auto fetching and saving of link in the database

##### Problems Faced

    - Metadata fetched were mostly broken
    - Poor error handling of data
    - Vulnerable backend REST API
    - Unimplemented drag and drop with the difficult bookmarks schema  ***Unfixed***

---

# October, 2023

## Languages Used: Typescript, CSS, SQL, HTML

### Frameworks and tools used:

    Frontend: Next.js(App router & Server components)
    Build Tool: Webpack(Next.js in built)
    Dev Tool: Turbopack
    Styling and UI: TailwindCSS, DaisyUI
    Backend: Linode, Docker(Postgres Image), Drizzle ORM
    Testing: Cypess, Jest
    Authentication:  Email, NextAuth, OAuth-Google
    State Management: React Context API
    Data Fetching on client: Tanstack Query

### Libraries and helpers used:

    Emoji Mart --> For emoji icons for each list
    Fuse.js --> for fuzzy searching bookmarks
    Faker.js --> for fake data
    Open Graph Scraper --> for Open Graph data

#### Features and Changes

    - Migrating the database from Supabase to Docker Image in Linode resulting in 6x performance on data fetching
    - REST API was secured with authorization middleware
    - Further improved state management and link share using URL params

---

# November, 2023

## Languages Used: Typescript, CSS, SQL, HTML

### Frameworks and tools used:

    Full Stack: Next.js(App router and Server compoenents)
    Styling and UI: TailwindCSS, ChakraUI, HeadlessUI
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
