import { useEffect, useState } from "react";

function ColorPicker() {
  const [color, setColor] = useState('#000000');
  const [img, setImg] = useState(null);

  const [typeOfColor, setTypeOfColor] = useState('hex');
  const [isInputColor, setInputColor] = useState(false);
  const [predefined, setPredefined] = useState(false);
  const [bgPic, setBgPic] = useState(false);

  const hexChars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

  const handleRandomHexColor = () => {
    let hexColor = '#';
    for(let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * hexChars.length);
      hexColor += hexChars[randomIndex];
    }
    setColor(hexColor);

    setBgPic(false);
    setPredefined(false);
    setInputColor(false);
  }

  const handleRandomRgbColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    setColor(`rgb(${r}, ${g}, ${b})`);

    setBgPic(false);
    setPredefined(false);
    setInputColor(false);
  }

  useEffect(() => {
    if(typeOfColor === 'rgb') {
      handleRandomRgbColor();
      setImg(null); // Remove background image
    } else if(typeOfColor === 'hex') {
      handleRandomHexColor();
      setImg(null); // Remove background image
    } else if (typeOfColor !== 'custombgpic') {
      setImg(null); // Remove background image if switching to a color
    }
  }, [typeOfColor]);

  const handleInputColor = (e) => {
    setColor(e.target.value);
    setImg(null); // Remove background image when custom color is chosen
    // setInputColor(false);
  }

  const handleInputVisible = () => {
    setInputColor(!isInputColor);
    setPredefined(false);
    setBgPic(false);
  }

  const handlePredefinedColor = () => {
    setPredefined(!predefined);
    setInputColor(false);
    setBgPic(false);
  }

  const handlePreColor = (preColor) => {
    setColor(preColor);
    setImg(null); // Remove background image when predefined color is chosen
    // setPredefined(false);
  }

  const handleBgPicture = () => {
    setBgPic(!bgPic);
    setColor(''); // Clear the color when a background image is chosen
    setInputColor(false);
    setPredefined(false);
  }

  const setBgPicture = (img) => {
    setImg(img);
    setColor(''); // Clear the color when a background image is set
    // setBgPic(false)
  }

  return (
    <div className="max-w-6xl sm:mx-auto mt-4 mb-3 border-2 border-gray-400 mx-4">
      <div style={{backgroundColor: color, backgroundImage: `url(${img})`, backgroundPosition: 'center', backgroundSize: 'cover'}} className="min-h-[26rem] w-full relative flex justify-center items-center px-4 py-4">
        <div className="bg-[#0000006e] p-6 rounded-md max-w-xl text-white text-center">
          <h1 className="text-3xl sm:text-4xl mb-2 font-medium leading-snug sm:leading-normal">Dynamic Color & Background Customizer</h1>
          <p className="leading-snug sm:leading-normal">The freedom to generate random HEX and RGB colors, select from predefined color options, or input your own custom color. Additionally, you can choose and set background images!</p>
        </div>
        {/* <p>{
            typeOfColor === 'hex' ? 'Hex color' :
            typeOfColor === 'custom' ? 'Custom color' :
            typeOfColor === 'predefined' ? 'Predefined Color' :
            typeOfColor === 'custombgpic' ? 'Custom Bg Picture' : 'Rgb Color'
        }</p> */}
        <p className={`${typeOfColor === 'custombgpic' ? 'hidden' : 'block'} absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-neutral-100 text-black py-1 px-3 rounded-full text-sm shadow-2xl`}>{color.toLowerCase()}</p>
      </div>
      <div className="grid sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4 text-center max-w-6xl mx-auto pt-8 px-8">
        <button className="bg-neutral-600 shadow-xl py-1 px-2 text-neutral-50" onClick={() => {setTypeOfColor('custom'); handleInputVisible()}}>Create Custom Color</button>
        <button className="bg-neutral-600 shadow-xl py-1 px-2 text-neutral-50" onClick={() => {setTypeOfColor('predefined'); handlePredefinedColor();}}>Choose Predefined color</button>  
        <button className="bg-neutral-600 shadow-xl py-1 px-2  text-neutral-50" onClick={() => {setTypeOfColor('custombgpic'); handleBgPicture();}}>Choose Bg Picture</button>
        <button className="bg-neutral-600 shadow-xl py-1 px-2 text-neutral-50" onClick={() => {setTypeOfColor('hex'); handleRandomHexColor();}}>Create Random HEX</button>
        <button className="bg-neutral-600 shadow-xl py-1 px-2 text-neutral-50" onClick={() => {setTypeOfColor('rgb'); handleRandomRgbColor();}}>Create Random RGB</button>
        <button className="bg-neutral-600 shadow-xl py-1 px-2 text-neutral-50" onClick={() => (typeOfColor === 'hex' ? handleRandomHexColor() : handleRandomRgbColor())}>Create Random</button>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-4">
        <div>
          {isInputColor && <div className="flex justify-center items-center gap-4">
              <p>Select custom color: </p>
              <input type="color" name="color" id="color" value={color} onChange={handleInputColor} />
            </div>}
        </div>

        <div>
          {predefined && <div className="flex items-center justify-center gap-4 py-4">
              <div onClick={() => handlePreColor('orange')} style={{backgroundColor: 'orange'}} className="block h-8 w-8"></div>
              <div onClick={() => handlePreColor('purple')} style={{backgroundColor: 'purple'}} className="block h-8 w-8"></div>
              <div onClick={() => handlePreColor('green')} style={{backgroundColor: 'green'}} className="block h-8 w-8"></div>
              <div onClick={() => handlePreColor('red')} style={{backgroundColor: 'red'}} className="block h-8 w-8"></div>
              <div onClick={() => handlePreColor('blue')} style={{backgroundColor: 'blue'}} className="block h-8 w-8"></div>
            </div>}
        </div>

        <div>
          {bgPic && <div className="flex items-center justify-center gap-4 py-4">
              <div onClick={() => setBgPicture('https://images.pexels.com/photos/450062/pexels-photo-450062.jpeg')} style={{backgroundImage: `url('https://images.pexels.com/photos/450062/pexels-photo-450062.jpeg')`, backgroundSize: 'cover'}} className="h-8 w-8"></div>

              <div onClick={() => setBgPicture('https://images.pexels.com/photos/3635300/pexels-photo-3635300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')} style={{backgroundImage: `url('https://images.pexels.com/photos/3635300/pexels-photo-3635300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`, backgroundSize: 'cover'}} className="h-8 w-8"></div>

              <div onClick={() => setBgPicture('https://images.pexels.com/photos/4316213/pexels-photo-4316213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')} style={{backgroundImage: `url('https://images.pexels.com/photos/4316213/pexels-photo-4316213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`, backgroundSize: 'cover'}} className="h-8 w-8"></div>

              <div onClick={() => setBgPicture('https://images.pexels.com/photos/6613570/pexels-photo-6613570.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')} style={{backgroundImage: `url('https://images.pexels.com/photos/6613570/pexels-photo-6613570.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`, backgroundSize: 'cover'}} className="h-8 w-8"></div>

              <div onClick={() => setBgPicture('https://images.pexels.com/photos/4096311/pexels-photo-4096311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')} style={{backgroundImage: `url('https://images.pexels.com/photos/4096311/pexels-photo-4096311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`, backgroundSize: 'cover'}} className="h-8 w-8"></div>
            </div>}
        </div>
      </div>
    </div>
  );
}

export default ColorPicker;
