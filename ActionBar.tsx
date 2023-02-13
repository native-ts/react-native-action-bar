import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { GestureResponderEvent, LayoutChangeEvent, PanResponderGestureState, StyleSheet, View, ViewProps } from "react-native";

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

    const [ containerHeight, setContainerHeight ] = useState<number>();

    const rootRef = useRef<View>(null);

    useImperativeHandle(ref, () => ({
      close(){

      },
      root: rootRef.current
    }));

    const handleLayoutRoot = (e: LayoutChangeEvent) => {
      const { height: h } = e.nativeEvent.layout;
      h === containerHeight || setContainerHeight(h);
    }

    return (
      <View
        {...rest}
        ref={rootRef}
        style={[
          styles.root,
          StyleSheet.flatten(style),
          !!height && { height }
        ]}
        onLayout={handleLayoutRoot}
      >
        <View
          style={[
            componentProps.buttons?.style,
            styles.actions,
            direction === 'left' ? styles.actionsLeft : styles.actionsRight
          ]}
        >

        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  root: {
    minHeight: 50,
    position: 'relative',
  },
  actions: {
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  actionsLeft: {
    left: 0,
  },
  actionsRight: {
    right: 0,
  }
});

ActionBar.displayName = 'ActionBar';
export default ActionBar;
