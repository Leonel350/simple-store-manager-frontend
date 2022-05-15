import { Box } from "@chakra-ui/react";
import { Button, Stack, Image, Icon, Text, Select } from "@chakra-ui/react";
import "../i18n/config";
import { useTranslation } from "react-i18next";
import {
   FcContacts,
   FcMoneyTransfer,
   FcPackage,
   FcCalculator,
} from "react-icons/fc";
import { Link } from "react-router-dom";


const Menu = () => {
   const { t, i18n } = useTranslation();
   console.log(i18n.language);
   function changeLanguage(lang) {
      console.log(i18n.language);
      i18n.changeLanguage(lang);
   }

   return (
      <div className="menu">
         <Box h={"60px"} bg="blue.600" w="100%" p={2} color="white">
            <Stack direction="row" spacing={4} align="center">
               <Link to="/">
                  <Image mr={10} src="/img/logo.png" height="40px" alt="Logo" />
               </Link>
               <Link to="products">
                  <Button
                     size="lg"
                     leftIcon={<Icon as={FcPackage} />}
                     pr={2}
                     color="#9AE6B4"
                     variant="link"
                  >
                     <Text fontSize="xl">{t("products")}</Text>
                  </Button>
               </Link>
               <Link to="products">
                  <Button
                     size="lg"
                     leftIcon={<Icon as={FcContacts} />}
                     pr={2}
                     color="#9AE6B4"
                     variant="link"
                  >
                     <Text fontSize="xl">{t("providers")}</Text>
                  </Button>
               </Link>
               <Link to="sales">
                  <Button
                     size="lg"
                     leftIcon={<Icon as={FcMoneyTransfer} />}
                     pr={2}
                     color="#9AE6B4"
                     variant="link"
                  >
                     <Text fontSize="xl">{t("sales")}</Text>
                  </Button>
               </Link>
               <Link to="daily-balance">
                  <Button
                     size="lg"
                     leftIcon={<Icon as={FcCalculator} />}
                     pr={2}
                     color="#9AE6B4"
                     variant="link"
                  >
                     <Text fontSize="xl">{t("dailyBalance")}</Text>
                  </Button>
               </Link>
               <Select onChange={e => changeLanguage(e.target.value)} color="black" w={70} size={"sm"} bg="white">
                  <option value="es">ES</option>
                  <option value="en">EN</option>
               </Select>
            </Stack>
         </Box>
      </div>
   );
};

export default Menu;
