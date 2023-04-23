import fs from 'fs'
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'posts');

export function createdPostInMd  (titulo,content){
    
    console.log(typeof content)
	fs.writeFileSync(`${postsDirectory}/${titulo}.md`,content)	
}

export default function handler(req, res) {
    const {titulo,post}  = JSON.parse(req.body)
    console.log(`${process.cwd()}\\posts\\${titulo}.md`)
    createdPostInMd(titulo,post)
    res.status(200).json({ text: 'Hello' });
  }