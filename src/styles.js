import { StyleSheet } from "react-native";
// 画面サイズにスケールを合わせてくれるらしいライブラリ
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  app: {
    // width: scale(250),
    // height: verticalScale(250),
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c9d14a"
  },

  p1: {
    left: scale(10),
    top: scale(10)
  },
  p2: {
    left: scale(90),
    top: scale(10)
  },
  text: {
    position: "fixed",
    margin: "0",
    paddingTop: scale(2),
    paddingBottom: scale(0),
    paddingLeft: scale(10),
    paddingRight: scale(10),
    color: "#aeb43d",
    border: "4px solid",
    borderRadius: scale(4),
    boxShadow: "1px 1px 0 white",
    textShadow: "1px 1px 0 white",
    fontSize: moderateScale(20)
  }
});

export default styles;
