import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

const Accordion = withStyles({
    root: {
      border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
    },
    expanded: {},
  })(MuiAccordion);

  
const AccordionSummary = withStyles({
    root: {
      backgroundColor: 'rgba(0, 0, 0, .03)',
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      marginBottom: -1,
      minHeight: 56,
      '&$expanded': {
        minHeight: 56,
      },
    },
    content: {
      '&$expanded': {
        margin: '12px 0',
      },
    },
    expanded: {},
  })(MuiAccordionSummary)

  const AccordionDetails = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiAccordionDetails);


const MyOrderItem = ({data, index}) => {

    const { fullname, deleveryAddress, phoneNumber, orderNotes, cart, createdAt } = data;

    const { product, totalPrice } = cart;

    const productItem = product.map((item) => {
        const { name, quantity, unitPrice } = item;
        return <div className="OrderDetails__content--item">
                    <p>
                        {name} x <strong>{quantity}</strong>
                    </p>
                    <p>${unitPrice}</p>
                </div>
    })

    const [expanded, setExpanded] = React.useState(`panel-0`);

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };

    return (
      <>
        <Accordion style={{borderRadius: "5px"}} square expanded={expanded === `panel-${index}`} onChange={handleChange(`panel-${index}`)}>
            <AccordionSummary style={{backgroundColor: "rgba(0, 0, 0, .02)"}} aria-controls="panel1d-content" id="panel1d-header">
                <Typography style={{fontSize: "1.5rem", color: "#758a53", fontWeight: "500"}}>Your Bill {index + 1} </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div className="OrderDetails__content"> 
                    <div className="OrderDetails__content--title">
                        <p>Products:</p>    
                        <p>Unit total</p>
                    </div>
                    {productItem}
                    <div className="OrderDetails__content--deliverycharges">
                        <p>Delivery charges</p>
                        <p>$0</p>
                    </div>
                    <div className="OrderDetails__content--yourName">
                        <p>Your Name</p>
                        <p>{fullname}</p>
                    </div>
                    <div className="OrderDetails__content--deliveryAddress">
                        <p>Delivery Address</p>
                        <p>{deleveryAddress}</p>
                    </div>
                    <div className="OrderDetails__content--yourPhone">
                        <p>Your phone</p>
                        <p>{phoneNumber}</p>
                    </div>
                    <div className="OrderDetails__content--timeOrder">
                        <p>Time order</p>
                        <p>{new Date(createdAt).toDateString()}</p>
                    </div>
                    <div className="OrderDetails__content--totalprice">
                        <p>Total Price</p>
                        <p>${totalPrice}</p>
                    </div>
                    <div className="OrderDetails__content--orderNotes">
                        <p>Order Notes:</p>
                        <textarea disabled value={orderNotes}/>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion> 
      </>
    );
};

export default MyOrderItem;
