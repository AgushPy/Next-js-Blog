import Head from "next/head";
import Layout from "../../components/layout";
import {
  Editor,
  ButtonBar,
  ButtonGroup,
  Field,
  Preview,
  EmojiBar,
} from "pulse-editor";
import {
  Base,
  Bold,
  Italic,
  Underline,
  Code,
  Link,
  Image,
  OrderedList,
  UnorderedList,
  Quote,
  Heading,
  Youtube,
} from "pulse-editor/buttons";
import { Alert, Button, InputLabel, TextField, Typography } from "@mui/material";
import { stringify } from "gray-matter";
import { redirect } from "next/dist/server/api-utils";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import Script from "next/script";
async function createMd(content,status) {
  content.preventDefault();
  const post = `---\ntitle: '${content.target.titulo.value}'\ndate: '${content.target.fecha.value}'\n---\n${content.target.value.value}\n`
  console.log(post)
  fetch('/api/create',{
    method: 'POST',
    body : JSON.stringify({titulo: content.target.titulo.value ,post : post})
  }).then(res => res.json).then(res => {status(true)})
}

export default function NewPost() {
  const [cratedWithOutErrors,setCratedWithOutErrors] = useState(null);
  return (
    <Layout create>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous"></link>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
        crossOrigin="anonymous"
      />
      {cratedWithOutErrors ? 
      <Alert severity="success">Post created success</Alert>
      :
      cratedWithOutErrors == null ? '' : <Alert severity="error">Post cannot created</Alert>
      }
      <form onSubmit={e => {createMd(e,setCratedWithOutErrors)}} method="POST">
        <TextField sx={{marginBottom:"20px"}} label="titulo" type="text" name="titulo" fullWidth />
        <br />
        <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateField
          sx={{marginBottom:"20px"}}
          fullWidth
          label="fecha"
          name="fecha"
          format="YYYY-MM-DD"
        />
    </LocalizationProvider>

        <br />
        <Editor>
          <Head>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            <link
              rel="stylesheet"
              href="https://raw.githubusercontent.com/PlatziDev/pulse-editor/master/examples/full-usage/static/styles.css"
            />
          </Head>
          <Typography>Content:</Typography>
          <ButtonBar>
            <ButtonGroup>
              <Bold className="btn btn-primary m-1">
                <i className="fa fa-bold " />
              </Bold>
              <Italic className="btn btn-primary m-1">
                <i className="fa fa-italic" />
              </Italic>
              <Underline className="btn btn-primary m-1">
                <i className="fa fa-underline" />
              </Underline>
              <Code className="btn btn-primary m-1">
                <i className="fa fa-code" />
              </Code>
              <Image className="btn btn-primary m-1">
                <i className="fa fa-image" />
              </Image>
            </ButtonGroup>
          </ButtonBar>
          <div className="PulseEditor-content">
            
            <Field style={{minHeight :"200px",width:"-webkit-fill-available" }}/>
            <Preview  />
          </div>
          <EmojiBar />
        </Editor>
        <Button type="submit" color="primary">Guardar</Button>
      </form>
    </Layout>
  );
}
