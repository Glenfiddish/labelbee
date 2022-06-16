/*
 * POINTCLOUD - ALPHA - DEMO
 *
 * @Author: Laoluo luozefeng@sensetime.com
 * @Date: 2022-06-13 19:05:33
 * @LastEditors: Laoluo luozefeng@sensetime.com
 * @LastEditTime: 2022-06-14 17:03:22
 */
import * as THREE from 'three';
import { MathUtils, Matrix4 } from 'three';
import { OrbitControls } from './OrbitControls';
import { PCDLoader } from './PCDLoader';

interface IProps {
  container: HTMLElement;
}

interface I3DSpaceCoord {
  x: number;
  y: number;
  z: number;
}

interface IVolume {
  /** 目标朝向垂直方向的长度 */
  width: number;
  /** 目标朝向方向的长度 */
  height: number;
  /** Z轴方向的长度 */
  depth: number;
}

interface IBoxParams {
  center: I3DSpaceCoord;
  volume: IVolume;
  rotate: number;
}
export class PointCloud {
  public renderer: THREE.WebGLRenderer;

  public scene: THREE.Scene;

  public camera: THREE.PerspectiveCamera;

  public controls: OrbitControls;

  public axesHelper: THREE.AxesHelper;

  public pcdLoader: PCDLoader;

  private container: HTMLElement;

  constructor({ container }: IProps) {
    this.container = container;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
    this.initCamera();

    this.scene = new THREE.Scene();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.axesHelper = new THREE.AxesHelper(1000);
    this.pcdLoader = new PCDLoader();

    this.scene.add(this.axesHelper);
    this.scene.add(this.camera);
    container.appendChild(this.renderer.domElement);

    this.init();

    // dev tool
    const helper = new THREE.CameraHelper(this.camera);
    this.scene.add(helper);
  }

  public initCamera() {
    // Camera setting must be setted before Control's initial.
    const { camera } = this;
    camera.position.set(-100, 15, 15);
    camera.up.set(0, 0, 1);
  }

  public initControls() {
    const { controls } = this;
    const centerPoint = [15, 15, 15];
    controls.target = new THREE.Vector3(...centerPoint); // Camera watching?
    controls.addEventListener('change', () => {
      this.render();
    }); // use if there is no animation loop
    controls.minDistance = 1;

    controls.update();
  }

  public initRenderer() {
    const { renderer } = this;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  public init() {
    const { scene } = this;
    // Background
    scene.background = new THREE.Color(0x050505);

    this.initControls();
    this.initRenderer();

    const params: IBoxParams = {
      center: { x: 13, y: -1, z: 1 },
      volume: { depth: 2, width: 5, height: 2 },
      rotate: 180,
    };

    // Test for Render
    this.renderCircle();
    this.generateBox(params);
  }

  public generateBox(boxParams: IBoxParams, color = 0xffffff) {
    const { center, volume, rotate } = boxParams;
    const group = new THREE.Group();
    const geometry = new THREE.BoxGeometry(volume.width, volume.height, volume.depth);
    const matarial = new THREE.MeshBasicMaterial({ color: 'blue' });
    const cube = new THREE.Mesh(geometry, matarial);
    const box = new THREE.BoxHelper(cube, color);
    const arrow = this.generateBoxArrow(boxParams);

    group.add(box);
    group.add(arrow);
    group.position.set(center.x, center.y, center.z);

    group.rotation.set(0, 0, MathUtils.degToRad(rotate));
    this.scene.add(group);

    this.render();
  }

  public renderCircle() {
    const radius = 100;
    const curve = new THREE.EllipseCurve(
      15,
      15, // ax, aY
      radius,
      radius, // xRadius, yRadius
      0,
      2 * Math.PI, // aStartAngle, aEndAngle
      false, // aClockwise
      0, // aRotation
    );

    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

    // Create the final object to add to the scene
    const ellipse = new THREE.Line(geometry, material);
    this.scene.add(ellipse);
    this.render();
  }

  public loadPCDFile = (src: string) => {
    this.pcdLoader.load(src, (points: any) => {
      this.scene.add(points);
      points.material.size = 0.3;
      this.render();
    });
  };

  public generateBoxArrow = ({ volume }: IBoxParams) => {
    const dir = new THREE.Vector3(1, 0, 0);
    const origin = new THREE.Vector3(-volume.width / 2, 0, -volume.depth / 2);
    const length = volume.width;
    const hex = 0xffff00;
    const arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
    return arrowHelper;
  };

  public render() {
    this.renderer.render(this.scene, this.camera);
  }
}
