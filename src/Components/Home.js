import { Flex, Text, Box, Container } from "@chakra-ui/react";

import {
   Table,
   Thead,
   Tbody,
   Tr,
   Th,
   Td,
   TableCaption,
   TableContainer,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import API from "../API";
import "../i18n/config";
import { useTranslation } from "react-i18next";


function parseDate(datestring) {
   const date = new Date(datestring);
   return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}


const Home = () => {
   const {t} = useTranslation();
   const [lastSales, setlastSales] = useState([]);
   useEffect(() => {
      API.getLastSales().then((data) => {
         setlastSales(data);
      });
   }, []);
   return (
      <Container maxW="container.md">
         <Box w="100%" h="400px">
            <Flex h="100%" align="center" justify="space-around" color="white">
               <Box color={"black"} w="100%" h="280px" bg="green.200">
                  <TableContainer>
                     <Table variant="simple">
                        <TableCaption>
                           <Text fontSize="xl">{t("table1name")}</Text>
                        </TableCaption>
                        <Thead>
                           <Tr>
                              <Th>{t("date")}</Th>
                              <Th>{t("product")}</Th>
                              <Th isNumeric>{t("income")}</Th>
                           </Tr>
                        </Thead>
                        <Tbody>
                           {lastSales.map((sale) => (
                              <Tr>
                                 <Td>{parseDate(sale.date)}</Td>
                                 <Td>{sale.frozenProduct.name}</Td>
                                 <Td isNumeric>{sale.totalPrice}</Td>
                              </Tr>
                           ))}
                        </Tbody>
                     </Table>
                  </TableContainer>
               </Box>
            </Flex>
         </Box>
      </Container>
   );
};

export default Home;
