import {
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Show,
  Text,
} from "@chakra-ui/react";
import ticket from "/ticket.png";
import html2canvas from "html2canvas";
import React, { useState } from "react";

export const Ticket = () => {
  const [textname, setTextname] = useState();
  const [textdni, setTextdni] = useState();
  const textsname = (e) => {
    setTextname(e.target.value);
    console.log(e.target.value);
  };
  const textsdni = (e) => {
    setTextdni(e.target.value);
    console.log(e.target.value);
  };
  const Descargar = (e) => {
    html2canvas(document.querySelector("#exportar")).then(function (canvas) {
      let img = canvas.toDataURL("ticket/png");
      let link = document.createElement("a");
      link.download = "ticket.png";
      link.href = img;
      link.click();
    });
  };
  return (
    <>
      <Show breakpoint='(max-width: 450px)'>
        <Flex flexWrap="wrap" justifyContent="center">
          <Card w={700} px="20" py="10" gap={6}>
            <Text fontSize="md" pb="2" textAlign="center">
              Rellená los campos con tus datos exigidos para generar el ticket.
            </Text>
            <FormControl isRequired>
              <FormLabel>Nombre(s) y Apellido(s)</FormLabel>
              <Input
                onChange={textsname}
                placeholder="Nombre(s) y Apellido(s)"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>DNI (Documento Nacional de Identidad)</FormLabel>
              <Input
                onChange={textsdni}
                placeholder="DNI (Documento Nacional de Identidad)"
              />
            </FormControl>
            <Box id="exportar">
              <Text pos="absolute" top="380" left="27%" fontSize='7'>
                {textname}
              </Text>
              <Text pos="absolute" top="400" left="27%" fontSize='7'>
                {textdni}
              </Text>
              <Image src={ticket} />
            </Box>
            <Button
              onClick={Descargar}
              size="md"
              colorScheme="teal"
              variant="outline"
            >
              Descargar
            </Button>
            <Text fontSize="xs" textAlign="center">
              Válido sólo un ticket de regalo por persona. No es acumulable.
            </Text>
          </Card>
        </Flex>
      </Show>
      <Show breakpoint='(min-width: 450px)'>
        <Flex flexWrap="wrap" justifyContent="center">
          <Card w={700} px="20" py="10" gap={6}>
            <Text fontSize="md" pb="2" textAlign="center">
              Rellená los campos con tus datos exigidos para generar el ticket.
            </Text>
            <FormControl isRequired>
              <FormLabel>Nombre(s) y Apellido(s)</FormLabel>
              <Input
                onChange={textsname}
                placeholder="Nombre(s) y Apellido(s)"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>DNI (Documento Nacional de Identidad)</FormLabel>
              <Input
                onChange={textsdni}
                placeholder="DNI (Documento Nacional de Identidad)"
              />
            </FormControl>
            <Box id="exportar">
              <Text pos="absolute" top="350" left="20%" textAlign="center">
                {textname}
              </Text>
              <Text pos="absolute" top="400" left="20%">
                {textdni}
              </Text>
              <Image src={ticket} />
            </Box>
            <Button
              onClick={Descargar}
              size="md"
              colorScheme="teal"
              variant="outline"
            >
              Descargar
            </Button>
            <Text fontSize="xs" textAlign="center">
              Válido sólo un ticket de regalo por persona. No es acumulable.
            </Text>
          </Card>
        </Flex>
      </Show>
    </>
  );
};
