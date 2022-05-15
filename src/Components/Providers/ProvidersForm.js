import {
   Flex,
   Text,
   Box,
   Container,
   Button,
   Input,
   useDisclosure,
   Textarea,
} from "@chakra-ui/react";
import API from "../../API";
import "../../i18n/config";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
   AlertDialog,
   AlertDialogBody,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogContent,
   AlertDialogOverlay,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { CreatableSelect, Select } from "chakra-react-select";

const ProvidersForm = (props) => {
   const { id } = useParams();
   const { t } = useTranslation();
   const [provider, setProvider] = useState({});
   useEffect(() => {
      if (props.type === "edit") {
         API.getProvider(id).then((data) => {
            setProvider(data);
         });
      }
   }, [id, props.type]);
   const handleSubmit = async (event) => {
      event.preventDefault();
      const form = event.target;
      const data = new FormData(form);
      const name = data.get("name");
      const phone = data.get("phone");
      const email = data.get("email");
      const address = data.get("address");
      const notes = data.get("notes");
      if (props.type === "edit") {
         API.updateProvider(id, {
            name,
            phone,
            email,
            address,
            notes,
         }).then((data) => {
            window.location.href = "/providers";
         });
      } else {
         API.createProvider({
            name,
            phone,
            email,
            address,
            notes,
         }).then((data) => {
            window.location.href = "/providers";
         });
      }
   };
   return (
      <Container mt={5} bg="orange.300" maxW="container.md">
         <Flex
            as="form"
            onSubmit={handleSubmit}
            color="black"
            h="100%"
            align="center"
            justify="center"
         >
            <Box w="80%" p={5} h="500px">
               <Box>
                  <Text fontSize="xl">{t("name")}</Text>
                  <Input
                     bg={"white"}
                     type="text"
                     name="name"
                     placeholder={t("name")}
                     defaultValue={provider.name}
                     required
                  />
               </Box>
               <Box>
                  <Text fontSize="xl">{t("phone")}</Text>
                  <Input
                     bg={"white"}
                     type="text"
                     name="phone"
                     placeholder={t("phone")}
                     defaultValue={provider.phone}
                  />
               </Box>
               <Box>
                  <Text fontSize="xl">{t("email")}</Text>
                  <Input
                     bg={"white"}
                     type="text"
                     name="email"
                     placeholder={t("email")}
                     defaultValue={provider.email}
                  />
               </Box>
               <Box>
                  <Text fontSize="xl">{t("address")}</Text>
                  <Input
                     bg={"white"}
                     type="text"
                     name="address"
                     placeholder={t("address")}
                     defaultValue={provider.address}
                  />
               </Box>
               <Box>
                  <Text fontSize="xl">{t("notes")}</Text>
                  <Textarea
                     bg={"white"}
                     name="notes"
                     placeholder={t("notes")}
                     defaultValue={provider.notes}
                  />
               </Box>
               <Box mt={7}>
                  <Button colorScheme={"green"} color={"white"} type="submit">
                     {t("save")}
                  </Button>
                  {props.type === "edit" && (<DeleteDialog id={id} />)}
               </Box>
            </Box>
         </Flex>
      </Container>
   );
};

function DeleteDialog(props) {
   const { t } = useTranslation();
   const { id } = useParams();
   const { isOpen, onOpen, onClose } = useDisclosure();
   const cancelRef = React.useRef();

   function deleteProduct() {
      API.deleteProvider(id).then(() => {
         window.location.href = "/providers";
      });
   }

   return (
      <>
         <Button
            float={"right"}
            colorScheme={"red"}
            color={"white"}
            onClick={onOpen}
         >
            {t("delete")}
         </Button>

         <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
         >
            <AlertDialogOverlay>
               <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                     {t("deleteProvider")}
                  </AlertDialogHeader>

                  <AlertDialogBody>
                     {t("deleteProviderMessage")}
                  </AlertDialogBody>

                  <AlertDialogFooter>
                     <Button ref={cancelRef} onClick={onClose}>
                        {t("cancel")}
                     </Button>
                     <Button colorScheme="red" onClick={deleteProduct} ml={3}>
                        {t("delete")}
                     </Button>
                  </AlertDialogFooter>
               </AlertDialogContent>
            </AlertDialogOverlay>
         </AlertDialog>
      </>
   );
}

export default ProvidersForm;
