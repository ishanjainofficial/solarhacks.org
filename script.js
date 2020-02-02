
function FAQDrop(item)
{
	par = item.parentElement;
	sib = par.children[1];
	if(sib.classList.contains("FAQBoxOnP"))
	{
		sib.classList.remove("FAQBoxOnP");
		par.classList.remove("FAQBoxOn");
	}
	else
	{
		sib.classList.add("FAQBoxOnP");
		par.classList.add("FAQBoxOn");
	}
}
