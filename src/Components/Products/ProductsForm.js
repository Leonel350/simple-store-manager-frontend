import {
   Flex,
   Text,
   Box,
   Container,
   Button,
   Input,
   useDisclosure,
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
const ProductsForm = (props) => {
   const { id } = useParams();
   const { t } = useTranslation();
   const [categories, setCategories] = useState([]);
   const [providers, setProviders] = useState([]);
   const [product, setProduct] = useState({});
   const [category, setCategory] = useState("");
   const [provider, setProvider] = useState("");
   const [providerId, setProviderId] = useState("");
   useEffect(() => {
      API.getCategories().then((data) => {
         setCategories(data);
      });
      API.getProviders().then((data) => {
         setProviders(data);
      });
      if (props.type === "edit") {
         API.getProduct(id).then((data) => {
            setProduct(data);
            console.log(data);
            setCategory(data.category);
            setProviderId(data.provider?._id);
            setProvider(data.provider?.name);
         });
      }
   }, [id, props.type]);
   const handleSubmit = async (event) => {
      event.preventDefault();
      const form = event.target;
      const data = new FormData(form);
      const name = data.get("name");
      const category = data.get("category");
      const stock = data.get("stock");
      const price = data.get("price");
      const costPrice = data.get("costPrice");
      const barCode = data.get("barCode");

      const product = {
         name,
         category,
         provider: providerId,
         stock,
         price,
         costPrice,
         barCode,
      };
      console.log(product);
      if (props.type === "edit") {
         console.log(product);
         API.updateProduct(id, product).then((data) => {
            window.location.href = "/products";
         });
      } else {
         API.createProduct(product).then(() => {
            window.location.href = "/products";
         });
      }
   };
   console.log(product.category);
   return (
      <Container mt={5} bg="yellow.200" maxW="container.md">
         <Box w="100%"></Box>

         <form onSubmit={handleSubmit}>
            <Flex color="black" h="100%" align="center" justify="center">
               <Box w="100%" p={5} h="350px">
                  <Box>
                     <Text fontSize="xl">{t("name")}</Text>
                     <Input
                        bg={"white"}
                        type="text"
                        name="name"
                        placeholder={t("name")}
                        defaultValue={product.name}
                        required
                     />
                  </Box>
                  <Box>
                     <Text fontSize="xl">{t("category")}</Text>
                     <Box bg="white">
                        <CreatableSelect
                           bgcolor="white"
                           name="category"
                           placeholder={t("category")}
                           value={{
                              label: category,
                              value: category,
                           }}
                           onChange={(e) => {
                              setCategory(e.label);
                           }}
                           options={categories.map((category) => ({
                              value: category.name,
                              label: category.name,
                           }))}
                           required
                        ></CreatableSelect>
                     </Box>
                  </Box>
                  <Box>
                     <Text fontSize="xl">{t("provider")}</Text>
                     <Box bg="white">
                        <Select
                           name="provider"
                           value={{ label: provider, value: provider }}
                           onChange={(e) => {
                              setProviderId(e.value);
                              setProvider(e.label);
                           }}
                           options={providers.map((provider) => ({
                              value: provider._id,
                              label: provider.name,
                           }))}
                           required
                        ></Select>
                     </Box>
                  </Box>
                  <Box>
                     <Text fontSize="xl">{t("stock")}</Text>
                     <Input
                        bg={"white"}
                        type="number"
                        name="stock"
                        defaultValue={product.stock}
                        placeholder={t("stock")}
                        required
                     />
                  </Box>
               </Box>
               <Box p={5} w="100%" h="350px">
                  <Box>
                     <Text fontSize="xl">{t("price")}</Text>
                     <Input
                        bg={"white"}
                        type="number"
                        name="price"
                        defaultValue={product.price}
                        placeholder={t("price")}
                        required
                     />
                  </Box>
                  <Box>
                     <Text fontSize="xl">{t("costPrice")}</Text>
                     <Input
                        bg={"white"}
                        type="number"
                        name="costPrice"
                        defaultValue={product.costPrice}
                        placeholder={t("costPrice")}
                     />
                  </Box>

                  <Box>
                     <Text fontSize="xl">{t("barCode")}</Text>
                     <Input
                        bg={"white"}
                        name="barCode"
                        defaultValue={product.barCode}
                        placeholder={t("barCode")}
                     />
                  </Box>
                  <Box mt={7}>
                     <Button
                        colorScheme={"green"}
                        color={"white"}
                        type="submit"
                     >
                        {t("save")}
                     </Button>
                     {props.type === "edit" && (<DeleteDialog id={id} />)}
                  </Box>
               </Box>
            </Flex>
         </form>
      </Container>
   );
};

function DeleteDialog(props) {
   const { t } = useTranslation();
   const { id } = useParams();
   const { isOpen, onOpen, onClose } = useDisclosure();
   const cancelRef = React.useRef();

   function deleteProduct(){
      API.deleteProduct(id).then(() => {
         window.location.href = "/products";
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
                     {t("deleteProduct")}
                  </AlertDialogHeader>

                  <AlertDialogBody>
                     {t("deleteProductMessage")}
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

export default ProductsForm;
