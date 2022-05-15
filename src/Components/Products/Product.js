import "../../i18n/config";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { Box, Container, Text, Flex, Icon } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import API from "../../API";
import { MdEdit } from "react-icons/md";

const Product = (props) => {
   const { id } = useParams();
   const { t } = useTranslation();
   const [product, setProduct] = useState({});
   useEffect(() => {
      API.getProduct(id).then((data) => {
         setProduct(data);
      });
   }, [id]);

   return (
      <Container maxW="2xl" centerContent>
         <Flex p={7} w={"100%"} bg="yellow.200" mt={5} justify="space-between">
            <Box>
               <Text fontSize="4xl" color="blue.900">
                  {" "}
                  {product.name}
               </Text>
               <Text fontSize="2xl" color="blue.900">
                  {" "}
                  {t("stock")}
                  {": "}
                  <b>{product.stock}</b>
               </Text>
               <Text fontSize="2xl" color="blue.900">
                  {" "}
                  {t("price")}
                  {": "}
                  <b>
                     {"$"}
                     {product.price}
                  </b>
               </Text>
               {product.costPrice > 0 && (
                  <Text fontSize="1xl" color="blue.900">
                     {" "}
                     {t("costPrice")}
                     {": "}
                     <b>{product.costPrice}</b>
                  </Text>
               )}
               <Text mt={2} fontSize="1xl" color="blue.900">
                  {" "}
                  {t("category")}
                  {": "}
                  <b>{product.category}</b>
               </Text>
               <Text as="u" fontSize="1xl" color="blue.900">
                  {" "}
                  {t("provider")}
                  {": "}
                  <b>{product.provider?.name}</b>
               </Text>
               {product.barCode && (
                  <Text fontSize="1xl" color="blue.900">
                     {" "}
                     {t("barCode")}
                     {": "}
                     <b>{product.barCode}</b>
                  </Text>
               )}
            </Box>
            <Box>
               <Link to={`/products/${id}/edit`}> <Icon as={MdEdit}/></Link>
            </Box>
         </Flex>
      </Container>
   );
};

export default Product;
