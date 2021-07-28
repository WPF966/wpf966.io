const rootElement=document.documentElement;
const darkModeClassName="dark";
const darkModeStorageKey="user-color-scheme";
const darkModeTimeKey="user-color-scheme-time";
const validColorModeKeys={dark:true,light:true};
const invertDarkModeObj={dark:"light",light:"dark"};

const setLocalStorage=(e,t)=>{
	try{
		localStorage.setItem(e,t);
	}
	catch(e){}
};

const removeLocalStorage=e=>{
	try{localStorage.removeItem(e);}
	catch(e){}
};

const getLocalStorage=e=>{
	try{return localStorage.getItem(e);}
	catch(e){return null;}
};

const getModeFromCSSMediaQuery=()=>window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
const resetRootDarkModeClassAndLocalStorage=()=>{rootElement.classList.remove(darkModeClassName);
rootElement.classList.remove(invertDarkModeObj[darkModeClassName]);removeLocalStorage(darkModeStorageKey)};
const applyCustomDarkModeSettings=e=>{
	const t=e||getLocalStorage(darkModeStorageKey);
	if(validColorModeKeys[t]){
		rootElement.classList.add(t);
	    rootElement.classList.remove(invertDarkModeObj[t])
	}
	else{resetRootDarkModeClassAndLocalStorage()
	}
};

const toggleCustomDarkMode=()=>{
	let e=getLocalStorage(darkModeStorageKey);
	if(validColorModeKeys[e]){
		e=invertDarkModeObj[e];
	}
	else if(e===null){
		e=invertDarkModeObj[getModeFromCSSMediaQuery()];
	}
	else{
		return
	}
    setLocalStorage(darkModeStorageKey,e);
    setLocalStorage(darkModeTimeKey,+new Date);
    return e;
};
const initDarkMode=e=>{
	const t=(e.getHours()<7?new Date(e.getFullYear(),e.getMonth(),e.getDate()-1,7):new Date(e.getFullYear(),e.getMonth(),e.getDate(),7)).getTime();
	const o=(e.getHours()<19?new Date(e.getFullYear(),e.getMonth(),e.getDate()-1,19):new Date(e.getFullYear(),e.getMonth(),e.getDate(),19)).getTime();
	const a=new Date(parseInt(getLocalStorage(darkModeTimeKey)||"0",10)).getTime();
	let r=null;
	e=e.getTime();
	if(getModeFromCSSMediaQuery()==="dark"){
		applyCustomDarkModeSettings(darkModeClassName);
		r=darkModeClassName;
	}
	else if(t<o){
		if(o<a){
			applyCustomDarkModeSettings();
		}
		else{
			applyCustomDarkModeSettings(darkModeClassName);r=darkModeClassName;
		}
	}
	else{
		if(t<a){
		applyCustomDarkModeSettings();
	    }
	    else{
		    applyCustomDarkModeSettings(invertDarkModeObj[darkModeClassName]);
		    r=invertDarkModeObj[darkModeClassName];
	    }
	}
	
	if(r){
		setLocalStorage(darkModeStorageKey,r);
		setLocalStorage(darkModeTimeKey,+new Date);
	}
};

initDarkMode(new Date);