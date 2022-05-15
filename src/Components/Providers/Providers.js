import { Flex, Box, Container, Button, Icon } from "@chakra-ui/react";
import {
   Table,
   Thead,
   Tbody,
   Tr,
   Th,
   Td,
   TableContainer,
} from "@chakra-ui/react";
import { MdEdit, MdVisibility } from "react-icons/md";
import { useState, useEffect } from "react";
import API from "../../API";
import "../../i18n/config";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function getWindowDimensions() {
   const { innerWidth: width, innerHeight: height } = window;
   return {
      width,
      height,
   };
}

const Providers = () => {
   const { t } = useTranslation();
   const [providers, setProviders] = useState([]);
   const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
   );

   useEffect(() => {
      function handleResize() {
         setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   }, []);
   useEffect(() => {
      API.getProviders().then((data) => {
         setProviders(data);
         console.log(data);
      });
   }, []);
   return (
      <Container maxW="container.lg">
         <Box w="100%" h="300px">
            <Box
               mt={5}
               overflowY="auto"
               maxHeight={windowDimensions.height - 170}
               color={"black"}
               w="100%"
               bg="orange.200"
            >
               <TableContainer>
                  <Table variant="striped" colorScheme="orange">
                     <Thead>
                        <Tr>
                           <Th>{t("name")}</Th>
                           <Th>{t("phone")}</Th>
                           <Th>{t("address")}</Th>
                           <Th>{t("email")}</Th>
                           <Th>{t("actions")}</Th>

                        </Tr>
                     </Thead>
                     <Tbody>
                        {providers.map((provider) => (
                           <Tr key={provider.id}>
                              <Td><Link to={`/providers/${provider._id}`}><u>{provider.name}</u></Link></Td>
                              <Td>{provider.phone}</Td>
                              <Td>{provider.address}</Td>
                              <Td>{provider.email}</Td>
                              <Td isNumeric>
                                 {
                                    <Flex justifyContent="end">
                                       <Box mr={3}>
                                          <Link to={`/providers/${provider._id}`}>
                                             <Icon as={MdVisibility} />
                                          </Link>
                                       </Box>
                                       <Box>
                                          <Link
                                             to={`/providers/${provider._id}/edit`}
                                          >
                                             <Icon as={MdEdit} />
                                          </Link>
                                       </Box>
                                    </Flex>
                                 }
                              </Td>
                           </Tr>
                        ))}
                     </Tbody>
                  </Table>
               </TableContainer>
            </Box>
            <Box mt={5}>
               <Link to={"/providers/add"}>
                  <Button colorScheme="orange">{t("addProvider")}</Button>
               </Link>
            </Box>
         </Box>
      </Container>
   );
};

export default Providers;
