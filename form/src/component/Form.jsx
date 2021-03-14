import React from 'react'
import style from './Form.module.css'

function Form() {

    React.useEffect(()=>{
        localStorage.clear()
    }, [])

    // ESTADO EN DONDE SE GUARDA EL FORMULARIO
    const [form, setForm] = React.useState({
        name:null,
        age:null,
        email:null,
        password:null,
        maile:false,
        femenine:false,
        passwordConfirm: null,
    });

    // CADA VEZ QUE OCURRA UN CAMBIO SE ACTUALIZA EL ESTADO
    const handleForm = (v)=>{
        const value= v.target.value;
        const checked = v.target.checked;
        const name= v.target.name;

        setForm({
            ...form, [name]: value,
        });




    }


    //VALIDANDO EL FORMULARIO
    const [err, setErr]= React.useState({
        name: false,
        age:false,
        email: false,
        password: false,
        btn: false
    })

    const expresions= {
        text:/^[a-zA-ZÀ-ÿ\s]{1,40}$/,
        email: /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/,
        number:/^[0,1,2,3,4,5,6,7,8,9,10]{1,2}$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/,

    }
    const validate = (k)=>{
        const key = k.key;
        const name = k.target.name;
        switch (name) {
            case 'name':
                if(!expresions.text.test(form.name) && form.name !== ''){
                    setErr({
                        ...err, name: true, btn: true
                    });
                }else{
                    setErr({
                        ...err, name: false, btn: false
                    });
                }
                break
            case 'age':
                if(!expresions.number.test(form.age) && form.age !== ''){
                    setErr({
                        ...err, age: true, btn: true
                    });
                }else{
                    setErr({
                        ...err, age: false, btn: false
                    });
                }
                break
            case 'email':
                if(!expresions.email.test(form.email) && form.email !== ''){
                    setErr({
                        ...err, email: true, btn: true
                    });
                }else{
                    setErr({
                        ...err, email: false, btn: false
                    });
                }
                break
            case 'password':
                if(!expresions.password.test(form.password) && form.password !== ''){
                    setErr({
                        ...err, password: true, btn: true
                    });
                }else{
                    setErr({
                        ...err, password: false, btn: false
                    });
                }
                break
            case 'passwordConfirm':
                if(form.password !== ''){
                    if(form.password !== form.passwordConfirm && form.passwordConfirm !== ''){
                        setErr({
                            ...err, passwordConfirm: true, btn: true
                        });
                    }else{
                        setErr({
                            ...err, passwordConfirm: false, btn: false
                        });
                    }
                }

                break
            default:
                break;
        }
    }

    // Efecto del checkbox

    const handleCheck = (v)=>{
        const name = v.target.id;
        const checked = v.target.checked;

        if(!form.femenine && name === 'femenine'){
            setForm({
                ...form, femenine: true, maile: false
            })
        };
        if(form.femenine && name === 'femenine'){
            setForm({
                ...form, femenine: false,
            })
        };
        if(!form.maile && name === 'maile'){
            setForm({
                ...form, femenine: false, maile: true
            })
        }
        if(form.maile && name === 'maile'){
            setForm({
                ...form, maile: false
            })
        }

    };
    // Evío de datos al localstorage
    const [final, setFinal]= React.useState(false)
   const handleBtn = (v)=>{
       v.preventDefault()

       if(
           form.name &&
           form.age &&
           form.email &&
           form.password &&
           form.passwordConfirm
       ){
           if(form.maile){
               delete form.femenine;
               delete form.maile;
               form.gener = 'Masculino'
               let resul= JSON.stringify(form)
               localStorage.setItem('form', resul );
           };
           if(form.femenine){
            delete form.femenine;
            delete form.maile;
            form.gener = 'Femenino'
            let resul= JSON.stringify(form)
            localStorage.setItem('form', resul);
        };

       }
       const finality = localStorage.getItem('form')
       const resul = JSON.parse(finality)
       setFinal(resul);
       
   }
   
  

  
   
    return (
        <div className={style.containerForm}>
           {
               !final ? (
                <form className={style.form} onChange={handleForm} onKeyUp={validate} >
                {
                    err.name ? (
                        <>
                        <label className={style.labelErr}>Nombre:</label>
                        <input className={style.inputError} type="text" name='name' />
                        <p className={style.p}>El nombre ingresado no es válido.</p>
                        </>
                    ):(
                        <>
                        <label>Nombre:</label>
                        <input className={style.input} type="text" name='name' />
                        </>
                    )
                }
                {
                    err.age ? (
                        <>
                        <label> Edad:</label>
                        <input className={style.inputError} name='age'/>
                        <p className={style.p}>La edad ingresada no es válida.</p>
                        </>
                    ):(
                        <>
                        <label> Edad:</label>
                        <input className={style.input}  name='age'/>
                        </>
                    )
                }
               {
                   err.email ? (
                        <>
                        <label>Email:</label>
                        <input className={style.inputError} type="email" name='email' />
                        <p className={style.p}>El email ingresado no es válido.</p>
                        </>
                   ):(
                    <>
                    <label>Email:</label>
                    <input className={style.input} type="email" name='email' />
                    </>
                   )
               }
               {
                   err.password ? (
                    <>
                    <label>Contraseña:</label>
                    <input className={style.inputError} type="password" name='password' />
                    <p className={style.p}>La contraseña debe contener  letras, números y al menos un caracter especial.</p>

                    </>
                   ):(
                    <>
                    <label>Contraseña:</label>
                    <input className={style.input} type="password" name='password' />
                    </>
                   )
               }
                {
                    err.passwordConfirm ? (
                        <>
                        <label>Confirmar contraseña:</label>
                        <input className={style.inputError} type="password" name='passwordConfirm'/>
                        <p className={style.p}>Las contraseñas no coinciden</p>
                         </>
                    ): form.password === '' ? (
                        <>
                        <label>Confirmar contraseña:</label>
                        <input className={style.input} type="password" name='passwordConfirm' disabled/>
                        </>
                       ) :(
                        <>
                        <label>Confirmar contraseña:</label>
                        <input className={style.input} type="password" name='passwordConfirm'/>

                        </>
                    )
                }
                <div className={style.checkboxCircle}>
                    <div className={style.check}>
                        {
                            form.maile ? (
                                <div className={style.circle} onClick={handleCheck} id='maile' >
                                     <img className={style.imgActive} src="https://raw.githubusercontent.com/Godsont/Custom-Checkbox/13ce97a0e56ed98a1393fbd8d7b0bb8c1e1f0e71/img/check-circle.svg" alt=""/>
                                </div>
                            ):(
                                <div className={style.circle} onClick={handleCheck} id='maile' >
                                     <img className={style.img} src="https://raw.githubusercontent.com/Godsont/Custom-Checkbox/13ce97a0e56ed98a1393fbd8d7b0bb8c1e1f0e71/img/check-circle.svg" alt=""/>
                                </div>
                            )
                        }

                        <p className={style.label}  htmlFor="maile" > Masculino</p>
                    </div>
                    <div className={style.check}>
                        {
                            form.femenine ? (
                                <div className={style.circle} onClick={handleCheck} id='femenine'>
                                    <img className={style.imgActive} src="https://raw.githubusercontent.com/Godsont/Custom-Checkbox/13ce97a0e56ed98a1393fbd8d7b0bb8c1e1f0e71/img/check-circle.svg" alt=""/>
                                </div>
                            ):(
                                <div className={style.circle} onClick={handleCheck} id='femenine'>
                                    <img className={style.img} src="https://raw.githubusercontent.com/Godsont/Custom-Checkbox/13ce97a0e56ed98a1393fbd8d7b0bb8c1e1f0e71/img/check-circle.svg" alt=""/>
                                </div>
                            )
                        }

                        <p className={style.label} htmlFor="femenine"> Femenino</p>
                    </div>

                </div>
                {
                    err.btn  ? (
                        <button className={style.btnError}  disabled>Error</button>
                    ):(
                        <button className={style.btn} onClick={handleBtn}>Enviar</button>
                    )
                }

            </form>
                   ):
                   (
                    <>
                    <h1>El formulario se envio correctamente</h1>

                    {/* <h2>El formulario está listo para enviarse al back</h2>
                    <p> Nombre: {final.name} </p>
                    <p> Edad: {final.age} </p>
                    <p> Mail: {final.email} </p>
                    <p> Contraseña: {final.password} </p>
                    <p> Genero: {final.gener} </p> */}
                    </>
                    )
           }
        </div>
    )
}

export default Form;
