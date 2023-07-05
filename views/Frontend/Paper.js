import * as React from 'react';
import { Avatar, Button, Card, Checkbox, Text, ActivityIndicator, IconButton, Badge, Appbar, MD3Colors  } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const Paper = () => {
  const [checked, setChecked] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleCheckboxToggle = () => {
    setChecked(!checked);
  };

  const handleButtonPress = () => {
    setLoading(true);
    // Simular una operación asincrónica
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (

    <Card>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => { }} />
      </Appbar.Header>
      <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
      <Card.Content>
        <Text variant="titleLarge">Card title</Text>
        <Text variant="bodyMedium">Card content</Text>
      </Card.Content>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Actions>
        <Button onPress={handleButtonPress}>Cancel</Button>
        <Button onPress={handleButtonPress}>Ok</Button>
      </Card.Actions>
      <Card.Content>
        <Checkbox.Item
          label="Checkbox"
          status={checked ? 'checked' : 'unchecked'}
          onPress={handleCheckboxToggle}
        />
        <Checkbox.Android
          status={checked ? 'checked' : 'unchecked'}
          onPress={handleCheckboxToggle}
        />
        <Checkbox.IOS
          status={checked ? 'checked' : 'unchecked'}
          onPress={handleCheckboxToggle}
        />
        <Checkbox.Item
          label="Disabled Checkbox"
          status="checked"
          disabled
        />
        <Button mode="contained" onPress={handleButtonPress}>
          Press me
        </Button>
        <Button icon="camera" mode="contained" onPress={handleButtonPress}>
          Capture
        </Button>
        <Button mode="outlined" onPress={handleButtonPress}>
          Outline Button
        </Button>
        <Button icon="star" mode="outlined" onPress={handleButtonPress}>
          Star
        </Button>
        <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
          Press me
        </Button>
        <IconButton icon="heart" size={30} onPress={handleButtonPress} />
        <IconButton icon="bookmark" color="red" size={30} onPress={handleButtonPress} />
        <IconButton icon="share-variant" size={30} onPress={handleButtonPress} />
        <IconButton
          icon="camera"
          iconColor={MD3Colors.error50}
          size={20}
          onPress={() => console.log('Pressed')}
        />

        <Badge>5</Badge>
        <Badge visible={true} size={24}>10</Badge>
        <ActivityIndicator animating={loading} />
      </Card.Content>
    </Card>
  );
};

export default Paper;
