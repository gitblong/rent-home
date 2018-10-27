/**
 * Created by chenqilong on 2018/9/27.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import TapActiveContractContainer from './TapActiveContractContainer';
import TapSignatureContractContainer from './TapSignatureContractContainer';
import TapWithdrawDepositContainer from './TapWithdrawDepositContainer';
import TapPayDepositContainer from './TapPayDepositContainer';
import TapRentContainer from './TapRentContainer';
import TapWithdrawActiveFeeContainer from './TapWithdrawActiveFeeContainer';

const styles = theme => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing.unit,
        "&svg": {
            color: blue[400]
        }
    },
    backButton: {
        marginRight: theme.spacing.unit,
    },
    completed: {
        display: 'inline-block',
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
});

function getSteps() {
    return ['激活合同', '签署租赁协议', '支付押金', '租赁协议已生效', '退还押金', '已完成租赁协议'];
}

class ContractSteps extends React.Component {


    constructor(props) {
        super(props);
        let completed = new Set();
        getSteps().map((obj, index) => {
            if (index < parseInt(props.contractInfo.status)) {
                completed.add(index);
            }
        });
        this.state = {
            activeStep: parseInt(props.contractInfo.status),
            completed: completed,
            skipped: new Set(),
        };
    }

    totalSteps = () => {
        return getSteps().length;
    };

    isStepOptional = step => {
        return step === 1;
    };

    handleSkip = () => {
        const {activeStep} = this.state;
        if (!this.isStepOptional(activeStep)) {
            // You probably want to guard against something like this
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        this.setState(state => {
            const skipped = new Set(state.skipped.values());
            skipped.add(activeStep);
            return {
                activeStep: state.activeStep + 1,
                skipped,
            };
        });
    };

    handleNext = () => {
        let activeStep;

        if (this.isLastStep() && !this.allStepsCompleted()) {
            // It's the last step, but not all steps have been completed
            // find the first step that has been completed
            const steps = getSteps();
            activeStep = steps.findIndex((step, i) => !this.state.completed.has(i));
        } else {
            activeStep = this.state.activeStep + 1;
        }
        this.setState({
            activeStep,
        });
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleStep = step => () => {
        this.setState({
            activeStep: step,
        });
    };

    handleComplete = () => {
        const completed = new Set(this.state.completed);
        completed.add(this.state.activeStep);
        this.setState({
            completed,
        });

        if (completed.size !== this.totalSteps() - this.skippedSteps()) {
            this.handleNext();
        }
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
            completed: new Set(),
            skipped: new Set(),
        });
    };

    skippedSteps() {
        return this.state.skipped.size;
    }

    isStepSkipped(step) {
        return this.state.skipped.has(step);
    }

    isStepComplete(step) {
        return this.state.completed.has(step);
    }

    completedSteps() {
        return this.state.completed.size;
    }

    allStepsCompleted() {
        return this.completedSteps() === this.totalSteps() - this.skippedSteps();
    }

    isLastStep() {
        return this.state.activeStep === this.totalSteps() - 1;
    }

    render() {
        const {classes, contractInfo, rentContract,rentContractUtils,rentContractIndex,setBalance} = this.props;
        const steps = getSteps();
        const {activeStep} = this.state;
        return (
            <div className={classes.root}>
                <Stepper alternativeLabel nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const props = {};
                        const buttonProps = {};
                        if (this.isStepSkipped(index)) {
                            props.completed = false;
                        }
                        return (
                            <Step key={label} {...props}>
                                <StepButton
                                    onClick={this.handleStep(index)}
                                    completed={this.isStepComplete(index)}
                                    {...buttonProps}
                                >
                                    {label}
                                </StepButton>
                            </Step>
                        );
                    })}
                </Stepper>
                <div>
                    {
                        activeStep == 0 &&
                        <TapActiveContractContainer
                            rentContract={rentContract}
                            contractInfo={contractInfo}
                            rentContractUtils={rentContractUtils}
                            handleComplete={this.handleComplete}
                            setBalance={setBalance}
                            rentContractIndex={rentContractIndex}
                        >
                            {steps[activeStep].label}
                        </TapActiveContractContainer>
                    }
                    {
                        activeStep == 1 &&
                        <TapSignatureContractContainer
                            rentContract={rentContract}
                            contractInfo={contractInfo}
                            rentContractUtils={rentContractUtils}
                            handleComplete={this.handleComplete}
                            setBalance={setBalance}
                            rentContractIndex={rentContractIndex}
                        >
                            {steps[activeStep].label}
                        </TapSignatureContractContainer>
                    }
                    {
                        activeStep == 2 &&
                        <TapPayDepositContainer
                            rentContract={rentContract}
                            contractInfo={contractInfo}
                            rentContractUtils={rentContractUtils}
                            handleComplete={this.handleComplete}
                            setBalance={setBalance}
                            rentContractIndex={rentContractIndex}>
                            {steps[activeStep].label}
                        </TapPayDepositContainer>
                    }
                    {
                        activeStep == 3 &&
                        <TapRentContainer
                            rentContract={rentContract}
                            contractInfo={contractInfo}
                            rentContractUtils={rentContractUtils}
                            handleComplete={this.handleComplete}
                            setBalance={setBalance}
                            rentContractIndex={rentContractIndex}>
                            {steps[activeStep].label}
                        </TapRentContainer>
                    }
                    {
                        activeStep == 4 &&
                        <TapWithdrawDepositContainer
                            rentContract={rentContract}
                            contractInfo={contractInfo}
                            rentContractUtils={rentContractUtils}
                            handleComplete={this.handleComplete}
                            setBalance={setBalance}
                            rentContractIndex={rentContractIndex}>
                            {steps[activeStep].label}
                        </TapWithdrawDepositContainer>
                    }
                    {
                        activeStep == 5 &&
                        <TapWithdrawActiveFeeContainer
                            rentContract={rentContract}
                            contractInfo={contractInfo}
                            rentContractUtils={rentContractUtils}
                            handleComplete={this.handleComplete}
                            setBalance={setBalance}
                            rentContractIndex={rentContractIndex}>
                            {steps[activeStep].label}
                        </TapWithdrawActiveFeeContainer>
                    }
                </div>
            </div>
        );
    }
}

ContractSteps.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(ContractSteps);
