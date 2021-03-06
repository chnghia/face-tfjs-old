// import * as tf from '../../dist/tfjs.esm';
// import * as tf from '@tensorflow/tfjs-core';
import * as tf from '@tensorflow/tfjs';

import { NetInput } from './NetInput';

export type TMediaElement = HTMLImageElement | HTMLVideoElement | HTMLCanvasElement

export type TResolvedNetInput = TMediaElement | tf.Tensor3D | tf.Tensor4D

export type TNetInputArg = string | TResolvedNetInput

export type TNetInput = TNetInputArg | Array<TNetInputArg> | NetInput | tf.Tensor4D
