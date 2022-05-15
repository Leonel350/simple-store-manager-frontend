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
     height
   };
 }
const Products = () => {
   const { t } = useTranslation();
   const [products, setProducts] = useState([]);
   const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
   useEffect(() => {
      API.getProducts().then((data) => {
         setProducts(data);
         console.log(data);
      });
   }, []);
   return (
      <Container maxW="container.lg">
         <Box w="100%" h="300px">
            <Box mt={5} overflowY="auto" maxHeight={windowDimensions.height-170} color={"black"} w="100%"  bg="yellow.200">
               <TableContainer  >
                  <Table variant='striped' colorScheme='yellow'>
                     <Thead>
                        <Tr>
                           <Th>{t("name")}</Th>
                           <Th>{t("category")}</Th>
                           <Th>{t("provider")}</Th>
                           <Th isNumeric>{t("stock")}</Th>
                           <Th isNumeric>{t("price")}</Th>
                           <Th isNumeric>{t("actions")}</Th>
                        </Tr>
                     </Thead>
                     <Tbody>
                        {products.map((product) => (
                           <Tr>
                              <Td>
                                 <u><Link to={`/products/${product._id}`}>
                                    {product.name}{" "}
                                 </Link></u>
                              </Td>

                              <Td>{product.category}</Td>
                              <Td>
                                 <Link
                                    to={`/providers/${product.provider?._id}`}
                                 >
                                    {product.provider?.name}
                                 </Link>
                              </Td>
                              <Td isNumeric>{product.stock}</Td>
                              <Td isNumeric>{product.price}</Td>
                              <Td isNumeric>
                                 {
                                    <Flex justifyContent="end">
                                       <Box mr={3}>
                                          <Link to={`/products/${product._id}`}>
                                             <Icon as={MdVisibility} />
                                          </Link>
                                       </Box>
                                       <Box>
                                          <Link
                                             to={`/products/${product._id}/edit`}
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
               <Link to={"/products/add"}>
                  <Button colorScheme="yellow">{t("addProduct")}</Button>
               </Link>
            </Box>
         </Box>
      </Container>
   );
};

export default Products;
