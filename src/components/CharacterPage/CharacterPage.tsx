import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@material-ui/core';
import { ArrowLeft, ArrowRight, Search } from '@material-ui/icons';
import * as React from 'react';
import styles from './styles';

interface IState {
    data: object[];
    gender: string;
    loading: boolean;
    missingName: boolean;
    name: string;
    next: string;
    previous: string;
    status: string;
}

class CharacterPage extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: [],
            gender: '',
            loading: false,
            missingName: false,
            name: '',
            next: '',
            previous: '',
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
                        disabled={this.state.loading}
                        variant="contained"
                        size="small"
                        onClick={this.handleSubmit('')}
                        style={styles.button}
                    >
                        <Search />
                        &nbsp;Search
                    </Button>
                    {this.state.loading ? (
                        <CircularProgress style={styles.loading} />
                    ) : null}
                </form>
                <div style={styles.container}>
                    {this.state.data !== []
                        ? this.state.data.map((item: any) => (
                              <Card key={item.name} style={styles.card}>
                                  <CardContent>
                                      <h2>{item.name}</h2>
                                      <img src={item.image} alt={item.name} />
                                      <p>Status: {item.status}</p>
                                      <p>Species: {item.species}</p>
                                      {item.type !== '' ? (
                                          <p>Type: {item.type}</p>
                                      ) : null}
                                      <p>Gender: {item.gender}</p>
                                      <p>Origin: {item.origin.name}</p>
                                      <p>Location: {item.location.name}</p>
                                  </CardContent>
                              </Card>
                          ))
                        : null}
                </div>
                <div style={styles.buttons}>
                    <Button
                        disabled={
                            this.state.previous === '' || this.state.loading
                        }
                        variant="fab"
                        color="primary"
                        aria-label="Previous"
                        onClick={this.handleSubmit('previous')}
                        style={styles.button}
                    >
                        <ArrowLeft />
                    </Button>
                    <Button
                        disabled={this.state.next === '' || this.state.loading}
                        variant="fab"
                        color="primary"
                        aria-label="Next"
                        onClick={this.handleSubmit('next')}
                        style={styles.button}
                    >
                        <ArrowRight />
                    </Button>
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

    private handleSubmit = (mode: string) => (
        event: React.MouseEvent<HTMLElement>
    ) => {
        let link =
            mode === 'previous'
                ? this.state.previous
                : mode === 'next'
                    ? this.state.next
                    : 'https://rickandmortyapi.com/api/character/';
        if (this.state.name.trim() === '' && mode === '') {
            this.setState({ missingName: true });
        } else {
            this.setState({
                data: [],
                loading: true
            });
            if (mode === '') {
                this.setState({ missingName: false });
                link += `?name=${this.state.name}`;
                if (this.state.status !== '') {
                    link += `&status=${this.state.status}`;
                }
                if (this.state.gender !== '') {
                    link += `&gender=${this.state.gender}`;
                }
            }
            fetch(link)
                .then((results: Response) => {
                    this.setState({ loading: false });
                    return results.json();
                })
                .then((data: any) => {
                    this.setState({
                        data: data.results,
                        next: data.info.next,
                        previous: data.info.prev
                    });
                })
                .catch((error: Error) => {
                    this.setState({ loading: false });
                    console.error(error);
                });
        }
    };
}

export default CharacterPage;
