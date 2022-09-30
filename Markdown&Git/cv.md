<img id="photo" src="./photo.jpg" alt="photo card" />

**Nikita Zharikow**

# Contact Info
- Cell: +375298416177
- Email: asckortan@gmail.com
- Telegram: [r0nar](https://t.me/nikita_zharikow)
- VK: [Nikita Zharikow](https://vk.com/just.zhar)

# Summary
I'm studying to be a programmer, quite hardworking, if I got down to business, I can't be torn off from it. I want to study the C# programming language in detail and master other programming languages, after graduation I want to get a job in an IT company. I mainly write back-end code, as this is an interesting environment for me.


# Skills
- C# (.Net, .Net Core)
- Java
- MSSQL
- React (v16)
- HTML
- CSS

# Code
```C#
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using ExcelDataParser.Resources;
using ExcelDataParser.Interfaces;

namespace ExcelDataParser
{
    public partial class ChoiceForm : Form
    {
        private string formText;
        private string[] listBoxItems;
        private string errorMessage;
        private IValidator validator;

        public ChoiceForm(string[] listBoxItems, string formText, string errorMessage, IValidator validator)
        {
            InitializeComponent();

            this.listBoxItems = listBoxItems;
            this.formText = formText;
            this.errorMessage = errorMessage;
            this.validator = validator;
        }

        public string GetSelectedItem()
        {
            return checkedListBox1.CheckedItems[0].ToString();
        }

        private void choiceButton_Click(object sender, EventArgs e)
        {
            try
            {
                if (validator.IsEqualOne(checkedListBox1.CheckedItems.Count))
                {
                    DialogResult = DialogResult.OK;
                }
                else
                {
                    throw new Exception(errorMessage);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, ErrorMessage.Caption, MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private void checkedListBox1_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (validator.IsPositive(checkedListBox1.CheckedItems.Count))
            {
                for (int i = 0; i < checkedListBox1.Items.Count; i++)
                {
                    checkedListBox1.SetItemChecked(i, false);
                }

                checkedListBox1.SetItemChecked(checkedListBox1.SelectedIndex, true);
            }
        }

        private void ChoiceForm_Load(object sender, EventArgs e)
        {
            Text = formText;
            checkedListBox1.Items.AddRange(listBoxItems);
        }
    }
}
```


# Work Experience
**CV**: https://github.com/Re9Wine/SVChVS_Zharikow_PIR-201


# English Level
Pre-Intermediate (A2)