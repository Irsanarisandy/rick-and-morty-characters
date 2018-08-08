import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import * as React from 'react';
import styles from './styles';

interface IState {
    data: object[];
    gender: string;
    missingName: boolean;
    name: string;
    page: number;
    status: string;
}

class CharacterPage extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: [],
            gender: '',
            missingName: false,
            name: '',
            page: 1,
            status: ''
        };
    }

    public render() {
        return (
            <div>
                <form
                    noValidate={true}
                    style={styles.container}
                    autoComplete="off"
                >
                    <TextField
                        required={true}
                        error={this.state.missingName}
                        id="name"
                        label="Name"
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        style={styles.textField}
                    />
                    <FormControl style={styles.selectField}>
                        <InputLabel htmlFor="status">Status</InputLabel>
                        <Select
                            value={this.state.status}
                            onChange={this.handleChange('status')}
                            inputProps={{
                                id: 'status',
                                name: 'Status'
                            }}
                        >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value={'Alive'}>Alive</MenuItem>
                            <MenuItem value={'Dead'}>Dead</MenuItem>
                            <MenuItem value={'Unknown'}>Unknown</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={styles.selectField}>
                        <InputLabel htmlFor="gender">Gender</InputLabel>
                        <Select
                            value={this.state.gender}
                            onChange={this.handleChange('gender')}
                            inputProps={{
                                id: 'gender',
                                name: 'Gender'
                            }}
                        >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value={'Male'}>Male</MenuItem>
                            <MenuItem value={'Female'}>Female</MenuItem>
                            <MenuItem value={'Genderless'}>Genderless</MenuItem>
                            <MenuItem value={'Unknown'}>Unknown</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={this.handleSubmit}
                        style={styles.button}
                    >
                        <Search />&nbsp;Search
                    </Button>
                </form>
                <div>
                    {this.state.data !== []
                        ? this.state.data.map((item: any) => (
                              <Card key={item.name}>
                                  <CardHeader title={item.name} />
                                  <CardMedia
                                      image={`${item.image}`}
                                      title={item.name}
                                  />
                                  <CardContent>
                                      <p>{item.status}</p>
                                      <p>{item.species}</p>
                                      <p>{item.type}</p>
                                      <p>{item.gender}</p>
                                      <p>{item.origin.name}</p>
                                      <p>{item.location.name}</p>
                                  </CardContent>
                              </Card>
                          ))
                        : null}
                </div>
            </div>
        );
    }

    private handleChange = (property: string) => (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        this.setState({
            [property]: event.target.value
        } as object);
    };

    private handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
        let link = 'https://rickandmortyapi.com/api/character/';
        if (this.state.name.trim() === '') {
            this.setState({
                missingName: true
            });
        } else {
            this.setState({
                missingName: false
            });
            link += `?name=${this.state.name}`;
            if (this.state.status !== '') {
                link += `&status=${this.state.status}`;
            }
            if (this.state.gender !== '') {
                link += `&gender=${this.state.gender}`;
            }
            fetch(link)
                .then((results: Response) => {
                    return results.json();
                })
                .then((data: any) => {
                    this.setState({
                        data: data.results
                    });
                })
                .catch((error: Error) => console.error(error));
        }
    };
}

export default CharacterPage;
