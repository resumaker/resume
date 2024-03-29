import React from 'react'
import { SketchPicker } from 'react-color'

const styles = {
  container: {
    height: 32,
    position: 'relative',
  },
  color: {
    width: 42,
    height: 22,
    borderRadius: 2,
  },
  swatch: {
    padding: 5,
    height: 32,
    borderRadius: 1,
    cursor: 'pointer',
    background: '#fff',
    display: 'inline-block',
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
  },
  popover: {
    position: 'absolute',
    left: '20%',
    zIndex: 2,
    top: 40,
  },
  cover: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'fixed',
  },
};

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      color: this.props.initialColor || '#5b4f96',
    };
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = color => {
    this.setState({ color: color.hex });
    this.props.onChange(color.hex);
  };

  render() {
    const { color, displayColorPicker } = this.state;
    return (
      <div style={styles.container}>
        <div style={styles.swatch} onClick={this.handleClick} data-role="swatch">
          <div style={{...styles.color, background: color}} />
        </div>
        {displayColorPicker && (
            <div style={styles.popover}>
                <div style={styles.cover} onClick={this.handleClose} data-role="cover" />
                <SketchPicker color={color} onChange={this.handleChange} />
            </div>
        )}
      </div>
    )
  }
}

export default ColorPicker;