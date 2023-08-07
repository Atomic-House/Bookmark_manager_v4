import React from "react";
import Sidebar from "./index";
import "@/app/globals.css";
import { faker, type Faker } from "@faker-js/faker";
import { ChakraProvider } from "@chakra-ui/react";
import { WorkspaceWithBoards } from "@/types";
import Providers from "@/app/providers";

describe("<Sidebar />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.viewport("macbook-15");
    cy.mount(
      // <ChakraProvider>
      <Providers>
        <Sidebar>Rest of the app here</Sidebar>,
      </Providers>,
    );
  });
});

const rawData = [
  {
    name: "Default",
    userId: "clkvnq4t40000ijo3vf3qd3r1",
    id: "clkvnq7ee0003ijo3nceeix90",
    email: "bakorol318@inkiny.com",
    boards: [
      {
        name: "Board 2",
        id: "clkwbwcca0000ijrgbtnxonaj",
        isDeleted: false,
        wsId: "clkvnq7ee0003ijo3nceeix90",
        email: "bakorol318@inkiny.com",
        isPublic: false,
      },
      {
        name: "Board ",
        id: "clkwhdm2a0001ijg8zkdcllil",
        isDeleted: false,
        wsId: "clkvnq7ee0003ijo3nceeix90",
        email: "bakorol318@inkiny.com",
        isPublic: false,
      },
    ],
    inbox: {
      id: "clkvnq7ee0004ijo3xxgh37gf",
      name: "Inbox",
      email: "bakorol318@inkiny.com",
      workspaceId: "clkvnq7ee0003ijo3nceeix90",
      userId: null,
    },
  },
  {
    name: "Workspace new",
    userId: "clkvnq4t40000ijo3vf3qd3r1",
    id: "clkvnqcf7000cijph4c34rudf",
    email: "bakorol318@inkiny.com",
    boards: [
      {
        name: "First Board",
        id: "clkvnqcf7000fijphgfek27u5",
        isDeleted: false,
        wsId: "clkvnqcf7000cijph4c34rudf",
        email: null,
        isPublic: false,
      },
    ],
    inbox: {
      id: "clkvnqcf7000dijphmwcilu7y",
      name: "Inbox",
      email: "bakorol318@inkiny.com",
      workspaceId: "clkvnqcf7000cijph4c34rudf",
      userId: null,
    },
  },
  {
    name: "Ws",
    userId: "clkvnq4t40000ijo3vf3qd3r1",
    id: "clkwgml5g0006ijwsrccl29aa",
    email: "bakorol318@inkiny.com",
    boards: [
      {
        name: "First Board",
        id: "clkwgml5g0009ijwsr2e7od8u",
        isDeleted: false,
        wsId: "clkwgml5g0006ijwsrccl29aa",
        email: null,
        isPublic: false,
      },
    ],
    inbox: {
      id: "clkwgml5g0007ijws9j2m0b5u",
      name: "Inbox",
      email: "bakorol318@inkiny.com",
      workspaceId: "clkwgml5g0006ijwsrccl29aa",
      userId: null,
    },
  },
  {
    name: "Workspace",
    userId: "clkvnq4t40000ijo3vf3qd3r1",
    id: "clkwgsmj60000ijwo213nclqc",
    email: "bakorol318@inkiny.com",
    boards: [
      {
        name: "First Board",
        id: "clkwgsmj60003ijwodbsbsbyt",
        isDeleted: false,
        wsId: "clkwgsmj60000ijwo213nclqc",
        email: null,
        isPublic: false,
      },
    ],
    inbox: {
      id: "clkwgsmj60001ijwo30yt26jp",
      name: "Inbox",
      email: "bakorol318@inkiny.com",
      workspaceId: "clkwgsmj60000ijwo213nclqc",
      userId: null,
    },
  },
  {
    name: "Workspace",
    userId: "clkvnq4t40000ijo3vf3qd3r1",
    id: "clkwgwfdl0006ijwoy4uwyjya",
    email: "bakorol318@inkiny.com",
    boards: [
      {
        name: "First Board",
        id: "clkwgwfdl0009ijwoykwo2ot0",
        isDeleted: false,
        wsId: "clkwgwfdl0006ijwoy4uwyjya",
        email: null,
        isPublic: false,
      },
    ],
    inbox: {
      id: "clkwgwfdl0007ijwoygfgg1a5",
      name: "Inbox",
      email: "bakorol318@inkiny.com",
      workspaceId: "clkwgwfdl0006ijwoy4uwyjya",
      userId: null,
    },
  },
  {
    name: "Workspace 1",
    userId: "clkvnq4t40000ijo3vf3qd3r1",
    id: "clkwh8kwa0001ijmx4bajw16g",
    email: "bakorol318@inkiny.com",
    boards: [
      {
        name: "First Board",
        id: "clkwh8kwa0004ijmxtgga73vw",
        isDeleted: false,
        wsId: "clkwh8kwa0001ijmx4bajw16g",
        email: null,
        isPublic: false,
      },
      {
        name: "Board 5",
        id: "clkwh8vda0000ijz717xl6270",
        isDeleted: false,
        wsId: "clkwh8kwa0001ijmx4bajw16g",
        email: "bakorol318@inkiny.com",
        isPublic: false,
      },
      {
        name: "Board 5",
        id: "clkwh8xw60001ijz7iiej8ufs",
        isDeleted: false,
        wsId: "clkwh8kwa0001ijmx4bajw16g",
        email: "bakorol318@inkiny.com",
        isPublic: false,
      },
    ],
    inbox: {
      id: "clkwh8kwa0002ijmxdscrjz7a",
      name: "Inbox",
      email: "bakorol318@inkiny.com",
      workspaceId: "clkwh8kwa0001ijmx4bajw16g",
      userId: null,
    },
  },
];
