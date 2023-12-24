"use client"
import React, { useRef, useState } from 'react';
import { Box, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PostUser from '@/services/user.service';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import Paper from '@mui/material/Paper';
import { Viewer, Worker } from '@react-pdf-viewer/core';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import { ConstructionOutlined } from '@mui/icons-material';

// const ComponentTable = ({data}) => (
//   <TableContainer sx={{}}>
//     <Table sx={{maxWidth: 650,}} component={Paper}>
//       <TableHead>
//         <TableRow>
//           <TableCell >Nome</TableCell>
//           <TableCell align="right">Email</TableCell>
//           <TableCell align="right">Senha</TableCell>
//         </TableRow>
//       </TableHead>

//       <TableBody>
//         {data.map((item, index) => (
//           <TableRow key={index}>
//             <TableCell component="th">
//               {item.nome}
//             </TableCell>
//             <TableCell align='right'>
//               {item.email}
//             </TableCell>
//             <TableCell align='right'>
//               {item.senha}
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   </TableContainer>
// )

// export default function Home() {
//   const [showPassword, setShowPassword] = useState(false)
//   const [nome, setNome] = useState('');
//   const [email, setEmail] = useState('');
//   const [senha, setSenha] = useState('');
//   const [openTable, setOpenTable] = useState(false)
//   const [data, setData] = useState([])

//   const fetchData = () => {
//     // const postUser = new PostUser()

//     // try {
//     //   postUser.postUserService({ nome, email, senha })
//     //   console.log('Requisição realizada')
//     // } catch (error) {
//     //   console.log('Erro na requisição', error)
//     // }
//     fetch('http://localhost:3333/add', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         nome: nome,
//         email: email,
//         senha: senha
//       })
//     })
//     .catch(error => {
//       console.log('Erro na requisição POST', error)
//     })
//     .finally((final) => {
//       console.log("End of request", final)
//     })

//   }
//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword)
//   }

//   const handleOpenTable = () => {

//     const getUsers = new PostUser()

//     try {
//       getUsers.getUSerService()
//       .then(data => setData(data.data))
//         setOpenTable(!openTable)
//       console.log('Success!', data)
//     }
//     catch (error) {
//       console.log('Erro ao pegar os dados', error)
//     }
//   }

//   return (
//     <Box sx={{
//       display: 'flex',
//       flexDirection: "column",
//       alignItems: 'center',
//       height: '100vh',
//       width: '100%',
//       placeContent: 'center',
//       placeItems: 'center',
//       gap: 8
//     }}>
//       {openTable ? 
//         <ComponentTable data={data} />
//       :
//         <Box sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           width: { lg: '400px', md: '500px' },
//           height: 400,
//           padding: '20px',
//           background: 'white',
//           borderRadius: 3,
//           gap: 3
//         }}>
//           <TextField placeholder='Digite' onChange={(e) => setNome(e.target.value)} label={'Nome'} fullWidth />
//           <TextField placeholder='Digite' type='email' onChange={(e) => setEmail(e.target.value)} label={'Email'} fullWidth />
//           <OutlinedInput
//             id="outlined-adornment-password"
//             type={showPassword ? 'text' : 'password'}
//             placeholder='Password'
//             endAdornment={
//               <InputAdornment position="end">
//                 <IconButton
//                   aria-label="toggle password visibility"
//                   onClick={handleClickShowPassword}

//                   edge="end"
//                 >
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             }
//             label="Password"
//             onChange={(e) => setSenha(e.target.value)}
//           />
//           <Button variant='contained' onClick={fetchData}>
//             Enviar
//           </Button>
//         </Box>
//       }
//       <Button onClick={handleOpenTable}>
//         {openTable ? 'Mostrar Tabela' : 'Fechar Tabela'}
//       </Button>
//     </Box>
//   )
// }
const ViewFilePDF = ({ data }) => {
  return (
    <Box sx={{
      width: 500,
      height: 600,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '40px'

    }}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        {data.map((item, index) => (
          <Viewer key={index} fileUrl={item.buffer} />
        ))}
      </Worker>
    </Box>
  );
};


const Home = () => {
  const filedInput = useRef(null)
  const [legendPost, setLegendPost] = useState('')
  const [viewPDF, setViewPDF] = useState(false)
  const [data, setData] = useState([])
  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result.split(",")[1]);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file)
    });
  };

  const handleFileSend = async () => {
    const formData = new FormData()
    if (filedInput.current?.files && filedInput.current?.files.length > 0) {
      const file = filedInput.current.files[0]
      const types = ['image/jpeg', 'image/png', 'application/pdf', 'image/jpg']

      if (types.includes(file.type)) {
        const buffer = await readFileAsBase64(file)
        formData.append('user', legendPost)
        formData.append('file', file)
        console.log(`data:${buffer}`)
        fetch('http://localhost:3333/upload', {
          method: 'POST',
          body: formData
        })
          .catch(error => {
            console.log('Erro ao enviar dados', error)
          })
          .finally(final => {
            console.log('End of request', final)
          })
      }
      else {
        console.log('Tipo não existe!')
      }

      console.log(file)
    } else {
      alert('Não escolheu nenhum arquivo.')
    }
  }

  const handleFetch = async () => {
    try {
      setViewPDF(!viewPDF);

      const response = await fetch('http://localhost:3333/list');

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }

      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Erro na requisição', error.message);
    }
  };

  return (
    <Box sx={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      placeContent: 'center',
      placeItems: 'center'
    }}>
      {viewPDF ?
        <Box>
          <ViewFilePDF data={data} />
        </Box>
        :
        <Box component={Paper} sx={{
          maxWidth: '400px',
          minHeight: 230,
          background: 'transparent',
          display: 'flex',
          padding: '20px',
          border: '1px solid #fff',
          borderStyle: 'dotted',
          flexDirection: 'column',
          gap: 4
        }}>
          <TextField type='file' inputRef={filedInput} />
          <TextField type='text' onChange={(e) => setLegendPost(e.target.value)} />
          <Button variant='contained' onClick={handleFileSend} >
            Enviar
          </Button>
        </Box>
      }
      <Button onClick={handleFetch} >
        {viewPDF ? 'Voltar' : 'Ver PDF'}
      </Button>
    </Box>
  )
}
export default Home