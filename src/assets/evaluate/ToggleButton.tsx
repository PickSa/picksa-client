import SwitchSelector from "react-switch-selector";

export default function ToggleButton() {
  return (
    
<div
  style={{
    height: 40,
    width: 200
  }}
>
  <SwitchSelector
    initialSelectedIndex={0}
    onChange={function noRefCheck(){}}
    options={[
      {
        label: '합격',
        value: true
      },
      {
        label: '불합격',
        value: 20
      }
    ]}
  />
</div>
  );
}
