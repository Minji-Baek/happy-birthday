import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import gsap from 'gsap';


window.addEventListener('load', async ()=> {
  await init();
})

async function init(){
  let imgIndex = 0;
  const canvas = document.querySelector('#canvas');
  const textContainer = document.querySelector('.text-wrapper');
  let loadedImages = [];

  let textItems = [];
  const renderer = new THREE.WebGLRenderer({
    antialias: true, //pixel 다듬기?
    alpha: true,
    canvas: canvas, 
  });
  
  renderer.setSize(innerWidth,innerHeight); // canvas size 조절 가능
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75, //75가 널리 쓰임
    window.innerWidth / window.innerHeight, //카메라 종횡비
    2,
    1000
  );
  camera.position.set(0, 0, 0.02);

  const clock = new THREE.Clock();

  const loadImages = async () => {
    const images =[...document.querySelectorAll('body .img-wrapper img') ];
    const fetchImage =  images.map(
      (image) => new Promise((resolve, reject)=>{
        const img = new Image();
        img.src = image.src;
        img.onload = resolve(image);
        img.onerror = reject;
    }));

    loadedImages = await Promise.all(fetchImage);

    return loadedImages;
  }

  const setBackground = (image) => {
    image.style.width = window.innerWidth;
    image.style.height = window.innerHeight ;
   
    const texture = textureLoader.load(image.src);
   
      scene.background = texture;
      scene.environment = texture;
   
  }

  gsap.registerPlugin(ScrollTrigger); // scrollTrigger을 사용할수있음

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;

  const textureLoader = new THREE.TextureLoader();

  const createParticles = () => {
    const count = 500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
  
    for(let i = 0; i < count; i++){
      positions[i * 3] =  THREE.MathUtils.randFloatSpread(10);//Math.random() - 0.5;// x
      positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(10); //Math.random() - 0.5;// y
      positions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(10); //Math.random() - 0.5;// z
  
      colors[i * 3] =  (Math.random() * 0.2) + 0.5;// r
      colors[i * 3 + 1] = Math.random() * 0.1; // g
      colors[i * 3 + 2] = (Math.random() * 0.5) + 0.3; // b
  
    }
  
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/assets/textures/particle.png');
    const material = new THREE.PointsMaterial({
      size: 0.1,
      alphaMap: texture,
      transparent: true,
      depthWrite: false,
      vertexColors: true,
    });
    material.alphaMap = texture;
    material.transparent = true;
    material.depthWrite = false; //깊이 정보를 저장하여 그리는 것. 끄면 같은 계층에서 그려짐
    const points = new THREE.Points(geometry, material);
    return points;
    
  }

  const setText = () => {
    let item = textContainer.children;
    for(let i = 0; i < item.length; i ++ ){
      item[i].style.opacity = 0;
      if(i%2 == 0)
        item[i].setAttribute('class', 'text-container');
      else{
        item[i].setAttribute('class', 'text-container2');
      }
    }
    textItems = item;
  }

  const create = async () => {

    const particles = createParticles();
    scene.add(particles);
    const loadImage = await loadImages();

    return { loadImage }
  }

  const resize = () => {
    camera.aspect =  window.innerWidth /window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  const addEvent = () => {
    window.addEventListener('resize', resize);

    const t1 = gsap.timeline({ 
      scrollTrigger: {
      trigger: '.wrapper',
      start: 'top top', // 언제 어딜 지나면 시작할지
      end: 'bottom bottom', // 언제 어딜 지나면 시작할지
      // markers: true,
      scrub: true, //바로바뀜이 아니라 지정만큼 천천히
    }});
  
    t1
      .to(textItems[0], {
        opacity: 1,
        duration: 1,
        
        onStart: () => {
           setBackground(loadedImages[0]);
        },
      },)
      .to(textItems[1], {
        opacity: 1,
        duration: 1,
        onStart: () => {
           setBackground(loadedImages[1]);
        },
      },)
      .to(textItems[2], {
        opacity: 1,
        duration: 1,
        onStart: () => {
           setBackground(loadedImages[2]);
        },
      },)
      .to(textItems[3], {
        opacity: 1,
        duration: 1,
        onStart: () => {
           setBackground(loadedImages[3]);
        },
      },)
      .to(textItems[4], {
        opacity: 1,
        duration: 1,
        onStart: () => {
           setBackground(loadedImages[4]);
        },
      },)
      .to(textItems[5], {
        opacity: 1,
        duration: 1,
        onStart: () => {
           setBackground(loadedImages[5]);
        },
      },)
      .to(textItems[6], {
        opacity: 1,
        duration: 1,
        onStart: () => {
           setBackground(loadedImages[8]);
        },
      },)
      .to(textItems[7], {
        opacity: 1,
        duration: 1,
        onStart: () => {
           setBackground(loadedImages[7]);
        },
      },)
      .to(textItems[8], {
        opacity: 1,
        duration: 1,
        onStart: () => {
           setBackground(loadedImages[17]);
        },
      },)
      .to(textItems[9], {
        opacity: 1,
        duration: 1,
        onStart: () => {
           setBackground(loadedImages[9]);
        },
      },)
      .to(textItems[10], {
        opacity: 1,
        duration: 1,
        onStart: () => {
           setBackground(loadedImages[10]);
        },
      },)
      .to(textItems[11], {
        opacity: 1,
        duration: 1,
        onStart: () => {
           setBackground(loadedImages[11]);
        },
      },)
      .to(textItems[12], {
        opacity: 1,
        duration: 1,
        onStart: () => {
           setBackground(loadedImages[12]);
        },
      },)
      .to(textItems[13], {
        opacity: 1,
        duration: 1,
        onStart: () =>{
          setBackground(loadedImages[13]);
        },
      
      },) .to(textItems[14], {
        opacity: 1,
        duration: 1,
        onStart: () => {
           setBackground(loadedImages[6]);
        },
      },) .to(textItems[15], {
        opacity: 1,
        duration: 1,
        onStart: () => {
           setBackground(loadedImages[15]);
        },
      },) .to(textItems[16], {
        opacity: 1,
        duration: 1,
        onStart: () => {
           setBackground(loadedImages[14]);
        },
      },) .to(textItems[17], {
        opacity: 1,
        duration: 1,
        onStart: () => {
           setBackground(loadedImages[17]);
        },
      },) .to(textItems[18], {
        opacity: 1,
        duration: 1,
        onStart: () => {
           setBackground(loadedImages[16]);
        },
      },) .to(textItems[19], {
        opacity: 1,
        duration: 1,
        onStart: () => {
           setBackground(loadedImages[1]);
        },
      },) .to(textItems[20], {
        opacity: 1,
        duration: 1,
        onStart: () => {
           setBackground(loadedImages[2]);
        },
      },) 
      .to(textItems[21], {
        opacity: 1,
        duration: 1,
        onStart: () => {
           setBackground(loadedImages[3]);
        },
      },) 
      .to(textItems[22], {
        opacity: 1,
        duration: 1,
        onStart: () => {
           setBackground(loadedImages[4]);
        },
      },) 
      .to(textItems[23], {
        opacity: 1,
        duration: 1,
        onStart: () => {
           setBackground(loadedImages[11]);
        },
      },) 
      .to(textItems[24], {
        opacity: 1,
        duration: 1,
        onStart: () => {
           setBackground(loadedImages[15]);
        },
      },) 
      .to(textItems[25], {
        opacity: 1,
        duration: 1,
        onStart: () => {
           setBackground(loadedImages[10]);
        },
      },) 
      .to(textItems[26], {
        opacity: 1,
        duration: 1,
        onStart: () => {
           setBackground(loadedImages[3]);
        },
      },) 
      .to(textItems[27], {
        opacity: 1,
        duration: 1,
        marginBottom: 800,
        onStart: () => {
           setBackground(loadedImages[17]);
        },
      },) 


  
      gsap.to('.title', {
        opacity: 0,
        scrollTrigger: {
          trigger: '.wrapper',
          scrub: true,
          pin: true,
          // markers: true,
          end: '+=1000'
        },
      })
  
    };
  


  const draw = (obj) => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(() => {
      draw(obj);
     
      // console.log(camera.position)
    });
  };

  const initialize = async () => {
    const obj = await create();
    setText();
    addEvent();
    resize();
    setBackground(obj.loadImage[0]);
    draw(obj);
  };

  initialize();
}
