"use client"
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box
} from "@chakra-ui/react";
import Link from "next/link";
export default function Boards() {
  return <div>
    <Accordion allowToggle>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' fontSize={'xl'} textAlign='left'>
              Boards
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
          <div>
            <Link href={`/board/sdjflsd`}>Board</Link>
            {/* {boards.map((board:{id: string, name: string})=> ( */}
            {/* <Link key={board.id} href={`/board/${board.id}`}> */}
            {/*     {board.name} */}
            {/* </Link> */}
            {/* ))} */}
          </div>
    </AccordionPanel>

  </AccordionItem>

 
</Accordion>
  </div>
}
