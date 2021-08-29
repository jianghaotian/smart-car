/* eslint-disable no-unused-vars */
/**
 * 目前只支持单手柄
 * 并且只测试过xbox手柄
 */
import { useRef, useCallback, useEffect } from 'react';

// 手柄初始状态
export const initialGamepadState = {
  id: '',
  LH: 0,
  LV: 0,
  RH: 0,
  RV: 0,
  A: 0,
  B: 0,
  X: 0,
  Y: 0,
  LB: 0,
  RB: 0,
  LT: 0,
  RT: 0,
  BACK: 0,
  MENU: 0,
  L: 0,
  R: 0,
  TOP: 0,
  BOTTOM: 0,
  LEFT: 0,
  RIGHT: 0
};

export const useGamepad = (onGamepadChange) => {
  const gamepadStateRef = useRef(initialGamepadState);
  const animationRef = useRef(null);

  // 更新手柄状态
  const updateGamepadState = useCallback((gamepad) => {
    const {
      id,
      axes: [
        LH, // -1 ～ 1  左 ～ 右
        LV, // -1 ～ 1  上 ～ 下
        RH, // -1 ～ 1  左 ～ 右
        RV // -1 ～ 1  上 ～ 下
      ],
      buttons: [
        { value: A },
        { value: B },
        { value: X },
        { value: Y },
        { value: LB },
        { value: RB },
        { value: LT }, // 0 ～ 1
        { value: RT }, // 0 ～ 1
        { value: BACK },
        { value: MENU },
        { value: L },
        { value: R },
        { value: TOP },
        { value: BOTTOM },
        { value: LEFT },
        { value: RIGHT }
      ]
    } = gamepad;

    const oldState = gamepadStateRef.current;

    if (
      oldState.id !== id ||
      oldState.LH !== LH ||
      oldState.LV !== LV ||
      oldState.RH !== RH ||
      oldState.RV !== RV ||
      oldState.A !== A ||
      oldState.B !== B ||
      oldState.X !== X ||
      oldState.Y !== Y ||
      oldState.LB !== LB ||
      oldState.RB !== RB ||
      oldState.LT !== LT ||
      oldState.RT !== RT ||
      oldState.BACK !== BACK ||
      oldState.MENU !== MENU ||
      oldState.L !== L ||
      oldState.R !== R ||
      oldState.TOP !== TOP ||
      oldState.BOTTOM !== BOTTOM ||
      oldState.LEFT !== LEFT ||
      oldState.RIGHT !== RIGHT
    ) {
      gamepadStateRef.current = {
        id,
        LH,
        LV,
        RH,
        RV,
        A,
        B,
        X,
        Y,
        LB,
        RB,
        LT,
        RT,
        BACK,
        MENU,
        L,
        R,
        TOP,
        BOTTOM,
        LEFT,
        RIGHT
      };

      onGamepadChange(gamepadStateRef.current);
    }
  }, []);

  // 扫描手柄状态
  const scanGamepadState = useCallback(() => {
    const gamepad = navigator.getGamepads();
    if (gamepad.length && gamepad[0]) {
      updateGamepadState(gamepad[0]);
    }
  }, []);

  // 每帧扫描手柄状态
  const animate = useCallback(() => {
    scanGamepadState();

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  // 启动手柄状态扫描
  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // 处理监听事件
  const handleConnected = useCallback((e) => {
    console.log(
      '控制器已连接与 %d 位: %s. %d 个按钮, %d 个坐标方向。',
      e.gamepad.index,
      e.gamepad.id,
      e.gamepad.buttons.length,
      e.gamepad.axes.length
    );
    updateGamepadState(e.gamepad);
  }, []);

  const handleDisconnected = useCallback((e) => {
    console.log('控制器已从 %d 位断开：%s', e.gamepad.index, e.gamepad.id);
  }, []);

  // 监听事件
  useEffect(() => {
    window.addEventListener('gamepadconnected', handleConnected);
    window.addEventListener('gamepaddisconnected', handleDisconnected);

    return () => {
      window.removeEventListener('gamepadconnected', handleConnected);
      window.removeEventListener('gamepaddisconnected', handleDisconnected);
    };
  }, []);
};
