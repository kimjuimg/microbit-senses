/**
 * 1차시: 센서 이해와 데이터 수집 원리
 * 마이크로비트 관찰용 코드 (버튼 없이 항상 값 전송)
 *
 * 보내는 센서 값 (0.1초마다 JSON 한 줄)
 *   x, y, z        : 가속도 (좌우 / 앞뒤 / 위아래)   - 평형감각
 *   pitch, roll    : 기울기 각도 (앞뒤 / 좌우, 도)   - 평형감각
 *   temp           : 온도 (℃)                        - 피부
 *   light          : 밝기 (0~255)                     - 눈
 *
 * 사용법
 *  1) https://makecode.microbit.org 접속 → 새 프로젝트
 *  2) 오른쪽 위 { } JavaScript 탭으로 전환
 *  3) 아래 코드를 전체 복사해서 붙여넣기
 *  4) 마이크로비트를 USB로 연결하고 [다운로드]
 *
 * 마이크로비트 화면 보는 법
 *   물음표(?)  : 아직 컴퓨터와 연결되지 않음
 *   웃는 얼굴  : 연결 성공! 센서 값을 보내는 중
 *
 * 2~5차시에서 쓰는 버튼 기반 라벨링 코드(microbit_sensor_code.js)와는
 * 별개의 파일입니다. 1차시는 "관찰"만 하므로 A/B 버튼을 쓰지 않습니다.
 */

serial.redirectToUSB()
serial.setBaudRate(BaudRate.BaudRate115200)

// 아직 연결 전이라는 뜻으로 물음표를 띄워 둔다.
basic.showString("?")

// 웹 프로그램이 연결되면 "C", 연결을 끊으면 "D"를 보내온다.
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    let cmd = serial.readLine()
    if (cmd.indexOf("C") >= 0) {
        basic.showIcon(IconNames.Happy)     // 연결 성공 → 웃는 얼굴
    } else if (cmd.indexOf("D") >= 0) {
        basic.showString("?")               // 연결 끊김 → 물음표
    }
})

// 0.1초(100ms)마다 센서 값을 JSON 한 줄로 보낸다.
// 예: {"x":-24,"y":102,"z":-1010,"pitch":6,"roll":-3,"temp":24,"light":118}
//
// 빛 센서는 LED 화면을 잠깐 빌려 쓰기 때문에, 웃는 얼굴이 켜져 있으면
// 밝기 값이 조금 낮게 나올 수 있다 (수업 관찰에는 문제가 없다).
basic.forever(function () {
    serial.writeLine("{" +
        "\"x\":" + input.acceleration(Dimension.X) + "," +
        "\"y\":" + input.acceleration(Dimension.Y) + "," +
        "\"z\":" + input.acceleration(Dimension.Z) + "," +
        "\"pitch\":" + input.rotation(Rotation.Pitch) + "," +
        "\"roll\":" + input.rotation(Rotation.Roll) + "," +
        "\"temp\":" + input.temperature() + "," +
        "\"light\":" + input.lightLevel() +
        "}")
    basic.pause(100)
})
