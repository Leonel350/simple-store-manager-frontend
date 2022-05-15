import "../../i18n/config";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { Box, Container, Text, Flex, Icon } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import API from "../../API";
import { MdEdit } from "react-icons/md";

const Provider = (props) => {
   const { id } = useParams();
   const { t } = useTranslation();
   const [provider, setProvider] = useState({});
   useEffect(() => {
      API.getProvider(id).then((data) => {
         setProvider(data);
      });
   }, [id]);

   return (
      <Container maxW="2xl" centerContent>
         <Flex p={7} w={"100%"} bg="yellow.200" mt={5} justify="space-between">
            <Box>
               <Text fontSize="4xl" color="blue.900">
                  {" "}
                  {provider.name}
               </Text>
               {provider.phone && (
                  <Text fontSize="xl" color="blue.900">
                     {" "}
                     {t("phone")}
                     {": "}
                     <b>{provider.phone}</b>
                  </Text>
               )}
               {provider.email && (
                  <Text fontSize="xl" color="blue.900">
                     {" "}
                     {t("email")}
                     {": "}
                     <b>{provider.email}</b>
                  </Text>
               )}
               {provider.address && (
                  <Text fontSize="xl" color="blue.900">
                     {" "}
                     {t("address")}
                     {": "}
                     <b>{provider.address}</b>
                  </Text>
               )}
               <Box mt={8} p={6} bg="yellow.300">
                  <Text as="b" fontSize="xl" color="blue.900">
                     {t("notes")}:
                  </Text>
                  <Text mt={5} fontSize="xl" color="blue.900">
                     {provider.notes?.split("\n").map((item, key) => (
                        <div>
                           {item}
                           <br />
                        </div>
                     ))}
                  </Text>
               </Box>
            </Box>
            <Box>
               <Link to={`/providers/${id}/edit`}>
                  <Icon as={MdEdit} size="3rem" color="blue.900" />
               </Link>
            </Box>
         </Flex>
      </Container>
   );
};

export default Provider;
