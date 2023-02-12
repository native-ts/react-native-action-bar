import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { GestureResponderEvent, PanResponderGestureState, StyleSheet, View, ViewProps } from "react-native";

export interface ActionBarProps extends ViewProps{
  direction?: 'left' | 'right';
  disableOpacity?: boolean;
  onPress?(event: GestureResponderEvent): void;
  onPressButton?(button: 'edit' | 'delete'): void;
  onMove?(event: GestureResponderEvent, state: PanResponderGestureState): void;
  onRelease?(event: GestureResponderEvent, state: PanResponderGestureState): void;
  onClose?(): void;
  height?: string | number;
  componentProps?: {
    buttons?: ViewProps;
  }
}

export interface ActionBarRef{
  close(): void;
  root: View | null;
}

const ActionBar = forwardRef<ActionBarRef, ActionBarProps>(
  function ActionBar(props, ref){

    const {
      direction = 'right',
      disableOpacity,
      onPress,
      onPressButton,
      onMove,
      onRelease,
      onClose,
      height,
      componentProps = {},
      style,
      ...rest
    } = props;

    const rootRef = useRef<View>(null);

    useImperativeHandle(ref, () => ({
      close(){

      },
      root: rootRef.current
    }))

    return (
      <View
        {...rest}
        ref={rootRef}
        style={[
          styles.root,
          StyleSheet.flatten(style),
          !!height && { height }
        ]}
      >

      </View>
    );
  }
);

const styles = StyleSheet.create({
  root: {
    minHeight: 50
  }
});

ActionBar.displayName = 'ActionBar';
export default ActionBar;
